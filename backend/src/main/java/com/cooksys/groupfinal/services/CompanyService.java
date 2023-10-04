package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;

import java.util.Set;


public interface CompanyService {

    Set<FullUserDto> getAllUsers(Long id);

    Set<AnnouncementDto> getAllAnnouncements(Long id);

    Set<TeamDto> getAllTeams(Long id);

    Set<ProjectDto> getAllProjects(Long companyId, Long teamId);


    AnnouncementDto createAnnouncement(Long id, AnnouncementDto announcementDto);

    Set<Company> getAllCompanies();


    FullUserDto createUser(UserRequestDto userRequestDto, Long id);

    ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto);

    ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto);


    TeamDto createTeams(Long id, TeamDto teamDto);


}
