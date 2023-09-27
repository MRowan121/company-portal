import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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

  constructor() {}
  ngOnInit() {
    this.getTeams();
  }

  async getTeams() {
    const companyId = localStorage.getItem('selectedCompanyId');
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/teams`
    );
    this.teams = request.data.map((obj: any) => {
      return {
        teamId: obj.id,
        name: obj.name,
        projects: [],
        memberProfiles: obj.users,
        memberNames: [],
      };
    });
    this.getMemberNames();
    this.getProjects(companyId);
    console.log(this.teams);
  }

  async getProjects(companyId: any) {
    this.teams.forEach(async (team: Team) => {
      const request = await axios.get(
        `http://localhost:8080/company/${companyId}/teams/${team.teamId}/projects`
      );
      team.projects = request.data;
    });
  }

  getMemberNames() {
    this.teams.forEach((team: Team) =>
      team.memberProfiles.forEach((member: any) => {
        team.memberNames.push(
          `${member.profile.firstname} ${member.profile.lastname[0]}.`
        );
      })
    );
  }
}
