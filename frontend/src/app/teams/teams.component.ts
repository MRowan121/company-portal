import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { FullUserDto, ProjectDto, TeamDto } from '../interfaces';
import {
  getCompanyIdFromUrl,
  getCompanyUsers,
  getFullUser,
  getTeamProjects,
  getUserIdFromUrl,
} from '../utility-functions';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  companyId: string | null = '';
  companyUsers: any[] = [];
  error: string = '';
  showCreateForm: boolean = false;
  showTeamForm: boolean = false;
  teams: TeamDto[] = [];
  teamProjects: { [teamId: number]: ProjectDto[] | undefined } = {};
  user: FullUserDto = {} as FullUserDto;
  userId: string | null = '';

  constructor(private router: Router) {}
  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.userId = getUserIdFromUrl();
    this.companyId = getCompanyIdFromUrl();
    this.user = await getFullUser(this.userId);
    this.getTeams();
    this.companyUsers = await getCompanyUsers(this.companyId);
  }

  async getTeams() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams`
    );
    this.teams = request.data.sort((a: any, b: any) => a.id - b.id);

    this.filterCompanyTeams();

    // Populate the projectCounts for each team
    for (const team of this.teams) {
      const numOfProjects = await getTeamProjects(this.companyId, team.id);
      this.teamProjects[team.id] = numOfProjects;
    }
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

  openProjects(team: TeamDto) {
    const navigationExtras: NavigationExtras = {
      state: {
        team: team,
      },
    };
    const url = `/user/${this.userId}/company/${this.companyId}/teams/${team.id}/projects`;

    this.router.navigate([url], navigationExtras);
  }

  async onCreation(formData: any) {
    const newTeam = {
      name: formData.name,
      description: formData.description,
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
