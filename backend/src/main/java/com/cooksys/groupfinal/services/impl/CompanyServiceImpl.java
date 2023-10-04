package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.*;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

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

    private User findUser(Long id) {
        Optional<User> user = userRepository.findByIdAndActiveTrue(id);
        if (user.isEmpty())
            throw new NotFoundException("The id provided does not belong to an active user.");
        return user.get();
    }

    @Override
    public AnnouncementDto createAnnouncement(Long id, AnnouncementDto announcementDto) {
        Company company = findCompany(id);
        User user = findUser(announcementDto.getAuthor().getId());
        if (!announcementDto.getAuthor().isActive()) throw new BadRequestException("This user is not currently active");
        Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
        announcement.setDate(Timestamp.valueOf(LocalDateTime.now()));
        announcement.setCompany(company);
        announcement.getAuthor().setProfile(user.getProfile());
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));

    }

    public Set<Company> getAllCompanies() {
        return new HashSet<>(companyRepository.findAll());

    }


    @Override
    public ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto) {
        Company company = findCompany(companyId);
        Team team = findTeam(teamId);

        if (!company.getTeams().contains(team)) {
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
        // if get all project.teamid == id then add to the proejct to team project set
        // Set<Project> totalProjects = projectMapper.dtosToEntities(getAllProjects(company.getId(), newTeam.getId()));
        // newTeam.setProjects(totalProjects);
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


