package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class CompanyController {

    private final CompanyService companyService;
    private final CompanyMapper companyMapper;

    @GetMapping
    public CompanyListDto getAllCompanies() {
        Set<Company> companies = companyService.getAllCompanies();
        CompanyListDto companyListDto = new CompanyListDto();
        companyListDto.setCompanies(companyMapper.entitiesToDtos(companies));
        return companyListDto;
    }

    @GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }

    @GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }

    @PostMapping("/{id}/announcements")
    public AnnouncementDto createAnnouncement(@PathVariable Long id, @RequestBody AnnouncementDto announcementDto) {
        return companyService.createAnnouncement(id, announcementDto);
    }

    @GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }

    @GetMapping("/{companyId}/teams/{teamId}/projects")
    public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
        return companyService.getAllProjects(companyId, teamId);
    }

    @PostMapping("/{id}/user")
    public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long id) {
        return companyService.createUser(userRequestDto, id);

    }

    @PostMapping("/{id}/teams")
    public TeamDto createTeams(@PathVariable Long id, @RequestBody TeamDto team) {
        return companyService.createTeams(id, team);

    }


    @PostMapping("/{companyId}/teams/{teamId}/projects")
    public ResponseEntity<ProjectDto> createProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectDto projectDto) {
        ProjectDto createdProject = companyService.createProject(companyId, teamId, projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
    public ProjectDto updateProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId, @RequestBody ProjectDto projectDto) {
        return companyService.updateProject(companyId, teamId, projectId, projectDto);
    }

}
