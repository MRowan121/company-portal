import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { ProjectDto, TeamDto } from '../interfaces';
import { getFullUser } from '../http-requests';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: TeamDto[] = [];
  teamProjects: { [teamId: number]: ProjectDto[] | undefined } = {};
  companyId: string | null = '';
  userId: string | null = '';
  showCreateForm: boolean = false;
  showTeamForm: boolean = false;
  error: string = '';
  users: any[] = [];
  user: any = {};

  inputOne: string = 'Team Name';
  inputTwo: string = 'Description';

  constructor(private router: Router) {}
  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.getIdsFromUrl();
    this.user = await getFullUser(this.userId);
    this.getTeams();
    this.getCompanyUsers();
  }

  getIdsFromUrl() {
    const url = location.href;
    const userMatch = url.match(/\/user\/(\d+)\//);
    const companyMatch = url.match(/\/company\/(\d+)\//);

    if (userMatch && companyMatch) {
      this.userId = userMatch[1];
      this.companyId = companyMatch[1];
    }
  }

  async getTeams() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams`
    );
    this.teams = request.data.sort((a: any, b: any) => a.id - b.id);

    // Populate the projectCounts for each team
    for (const team of this.teams) {
      const numOfProjects = await this.getTeamProjects(team.id);
      this.teamProjects[team.id] = numOfProjects;
    }
    this.filterCompanyTeams();
  }

  filterCompanyTeams() {
    if (!this.user.admin) {
      this.teams = this.teams.filter((team: any) => {
        return team.teammates.some(
          (profile: any) => profile.id === this.user.id
        );
      });
    }
  }

  async getTeamProjects(teamId: number) {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams/${teamId}/projects`
    );
    return request.data;
  }

  async getCompanyUsers() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/users`
    );
    for (const user of request.data) this.users.push(user);
  }

  openProjects(team: TeamDto) {
    const navigationExtras: NavigationExtras = {
      state: {
        teamProjects: this.teamProjects[team.id],
        teamName: team.name,
        teamId: team.id,
      },
    };
    const url = `/user/${this.userId}/company/${this.companyId}/teams/${team.id}/projects`;

    this.router.navigate([url], navigationExtras);
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
