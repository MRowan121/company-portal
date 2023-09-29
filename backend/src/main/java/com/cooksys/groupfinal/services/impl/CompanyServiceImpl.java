package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;

	private final UserService userService;
	private final UserRepository userRepository;

	private final ProjectRepository projectRepository;
	private final BasicUserMapper basicUserMapper;
	private final AnnouncementRepository announcementRepository;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }


	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public AnnouncementDto createAnnouncement(Long id, AnnouncementRequestDto announcementRequestDto) {
		Company company = findCompany(id);
		User user = userRepository.findByStatus("JOINED");
		if (announcementRequestDto.getTitle() == null || announcementRequestDto.getMessage() == null) {
			throw new BadRequestException("Missing fields, please input a title or message");
		}

		Announcement newAnnouncement = announcementMapper.requestDtoToEntity(announcementRequestDto);
		newAnnouncement.setAuthor(user);
		newAnnouncement.setCompany(company);
		announcementRepository.saveAndFlush(newAnnouncement);

		return announcementMapper.entityToDto(newAnnouncement);

	}

	public Set<Company> getAllCompanies(){
		return new HashSet<>(companyRepository.findAll());

	}


	@Override
	public ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto){
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);

		if(!company.getTeams().contains(team)){
			throw new NotFoundException("Team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}

		Project project = new Project();
		project.setName(projectDto.getName());
		project.setDescription(projectDto.getDescription());
		project.setTeam(team);

		// Optional, if below code is removed, the created project will default to false
		project.setActive(true);

		projectRepository.save(project);
		return projectMapper.entityToDto(project);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto, Long id) {

		User newUser = fullUserMapper.requestDtoToEntity(userRequestDto);
		
		newUser.getCredentials().setUsername(newUser.getProfile().getEmail());
		
		Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(newUser.getCredentials().getUsername());
        if (!user.isEmpty()) {
			throw new BadRequestException("This username is already taken");
        }        
		newUser.setActive(true);

        Company company = findCompany(id);
        Set<User> allEmployees = company.getEmployees();
        allEmployees.add(newUser);
		
		Set<Company> userCompanies = newUser.getCompanies();
		userCompanies.add(company);
		
		newUser.setCompanies(userCompanies);
		company.setEmployees(allEmployees);
		
		newUser.setTeams(new HashSet<>());

		
		userRepository.saveAndFlush(newUser);
		
		return fullUserMapper.entityToFullUserDto(newUser);
	}

	@Override
	public TeamDto createTeams(Long id, TeamDto teamDto) {
		Team newTeam = new Team();
		newTeam = teamMapper.dtoToEntity(teamDto);
		System.out.print(newTeam);
		Company company = findCompany(id);
		newTeam.setCompany(company);
		//if get all project.teamid == id then add to the proejct to team project set
		//Set<Project> totalProjects = projectMapper.dtosToEntities(getAllProjects(company.getId(), newTeam.getId()));
		//newTeam.setProjects(totalProjects);
		teamRepository.saveAndFlush(newTeam);
		return teamMapper.entityToDto(newTeam);
	}

		@Override
		public ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto) {
			Company company = findCompany(companyId);
			Team team = findTeam(teamId);
			if (!company.getTeams().contains(team)) {
				throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
			}
			Project project = projectRepository.getReferenceById(projectId);
			if (!team.getProjects().contains(project)) {
				throw new NotFoundException("A project with id " + projectId + " does not exist in team with id " + teamId + ".");
			}
			project.setId(projectDto.getId());
			project.setName(projectDto.getName());
			project.setDescription(projectDto.getDescription());
			project.setActive(projectDto.isActive());
			project.setTeam(teamMapper.dtoToEntity(projectDto.getTeam()));
			projectRepository.saveAndFlush(project);
			return projectMapper.entityToDto(project);
		}
}


