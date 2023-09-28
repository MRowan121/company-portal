import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import axios from 'axios';
import { Console } from 'console';

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
  users: string[] = []
 

  constructor(private router: Router) {}
  ngOnInit() {
    this.getTeams();
    this.getCompanyUsers();
  }

  async getTeams() {
    const companyId = localStorage.getItem('selectedCompanyId');
    const request = await axios.get(
      `http://localhost:8080/company/6/teams`
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
    // console.log(this.teams);
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

  openProjects(team: Team) {
    const navigationExtras: NavigationExtras = {
      state: {
        projects: team.projects,
        teamName: team.name,
      },
    };
    this.router.navigate(['/teams/projects'], navigationExtras);
  }
  async getCompanyUsers() {
    const companyId = localStorage.getItem('selectedCompanyId');
    const request = await axios.get(
      `http://localhost:8080/company/6/users`
      // ${companyId}
    );
    this.users = request.data.map((obj: any) => {
      return {
        name: `${obj.profile.firstname} ${obj.profile.lastName}[0].`,
      };
    });
    console.log(this.users)
  }

  onClick(){
    if(this.isHidden= false){
      this.isHidden = true
      console.log(this.isHidden)
    }
    if(this.isHidden= true){
      this.isHidden = false;
    }
  }
}




  
  
