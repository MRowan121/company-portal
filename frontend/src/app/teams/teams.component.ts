import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor() {}
  ngOnInit() {
    this.getTeams();
  }

  async getTeams() {
    const companyId = localStorage.getItem('selectedCompanyId');
    console.log(companyId);
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/teams`
    );
    this.teams = request.data;
    console.log(this.teams);
  }
}
