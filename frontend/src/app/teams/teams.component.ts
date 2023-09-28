import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { Console } from 'console';
import { DataService } from '../data.service';

interface Team {
  teamId: number;
  name: string;
  projects: any[];
  memberProfiles: string[];
  memberNames: string[];
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  isHidden: boolean = true;
  users: string[] = [];
  companyId: string = this.dataService.getCompany().toString();
  isAdmin: string | null = localStorage.getItem('isAdmin');

  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {
    this.getTeams();
    this.getCompanyUsers();
  }

  async getTeams() {
    // const companyId = localStorage.getItem('selectedCompanyId');
    const request = await axios.get(
      //HARDCODED COMPANY ID VALUE - REPLACE 6 WITH $companyId
      `http://localhost:8080/company/${this.companyId}/teams`
    );
    console.log(request.data);
    this.teams = request.data
      .map((obj: any) => {
        return {
          teamId: obj.id,
          name: obj.name,
          projects: [],
          memberProfiles: obj.teammates,
          memberNames: [],
        };
      })
      .sort((a: any, b: any) => a.teamId - b.teamId);
    this.getMemberNames();
    this.getProjects(this.companyId);
    // console.log(this.teams);
  }

  async getProjects(companyId: any) {
    this.teams.forEach(async (team: Team) => {
      console.log(team.teamId);
      const request = await axios.get(
        `http://localhost:8080/company/${companyId}/teams/${team.teamId}/projects`
      );
      console.log(request.data);
      team.projects = request.data;
    });
  }

  getMemberNames() {
    this.teams.forEach((team: Team) =>
      team.memberProfiles.forEach((member: any) => {
        team.memberNames.push(
          `${member.profile.firstName} ${member.profile.lastName[0]}.`
        );
      })
    );
  }

  openProjects(team: Team) {
    const navigationExtras: NavigationExtras = {
      state: {
        projects: team.projects,
        teamName: team.name,
        teamId: team.teamId,
      },
    };
    this.router.navigate(['/teams/projects'], navigationExtras);
  }
  async getCompanyUsers() {
    const companyId = this.dataService.getCompany();
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/users`
    );
    this.users = request.data.map((obj: any) => {
      return {
        name: `${obj.profile.firstname} ${obj.profile.lastName}[0].`,
      };
    });
    console.log(this.users);
  }

  onClick() {
    if ((this.isHidden = false)) {
      this.isHidden = true;
      console.log(this.isHidden);
    }
    if ((this.isHidden = true)) {
      this.isHidden = false;
    }
  }
}
