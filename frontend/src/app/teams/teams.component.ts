import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { DataService } from '../data.service';
import { TeamDto } from '../interfaces';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: TeamDto[] = [];
  projectCounts: { [teamId: number]: number } = {};
  users: any[] = [];
  companyId: string = this.dataService.getCompany().toString();
  isAdmin: string | null = localStorage.getItem('isAdmin');
  showCreateForm: boolean = false;
  showTeamForm: boolean = false;
  inputOne: string = 'Team Name';
  inputTwo: string = 'Description';
  error: string = '';

  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {
    this.getTeams();
    this.getCompanyUsers();
  }

  async getTeams() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams`
    );
    this.teams = request.data.sort((a: any, b: any) => a.id - b.id);

    // Populate the projectCounts for each team
    for (const team of this.teams) {
      const numOfProjects = await this.getProjects(team.id);
      this.projectCounts[team.id] = numOfProjects;
    }
    this.filterCompanyTeams();
  }

  filterCompanyTeams() {
    const currentUser = this.dataService.getUser();
    if (this.isAdmin === 'false') {
      this.teams = this.teams.filter((team: any) => {
        return team.teammates.some(
          (profile: any) => profile.id === currentUser.id
        );
      });
    }
  }

  async getProjects(teamId: number) {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams/${teamId}/projects`
    );
    return request.data.length;
  }

  async getCompanyUsers() {
    const companyId = this.dataService.getCompany();
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/users`
    );
    for (const user of request.data) this.users.push(user);
  }

  openProjects(team: TeamDto) {
    const navigationExtras: NavigationExtras = {
      state: {
        teamName: team.name,
        teamId: team.id,
      },
    };
    this.router.navigate(['/teams/projects'], navigationExtras);
  }

  async onCreation(formData: any) {
    const newTeam = {
      name: formData['Team Name'],
      description: formData['Description'],
      teammates: formData.members,
    };
    try {
      await axios.post(
        `http://localhost:8080/company/${this.companyId}/teams`,
        newTeam
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.getTeams();
  }

  showOverlay() {
    this.showCreateForm = !this.showCreateForm;
    this.showTeamForm = true;
  }

  closeOverlay() {
    this.showTeamForm = false;
    this.showCreateForm = false;
  }
}
