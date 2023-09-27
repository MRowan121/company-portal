import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  constructor() {}

  ngOnInit() {
    this.getProjects();
  }

  async getProjects() {
    const companyId = localStorage.getItem('selectedCompanyId');
    // Hard coded this for testing. Need functionality to get id of selected team.
    const teamId = 1;
    console.log(companyId);
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`
    );
    this.projects = request.data;
    console.log(this.projects);
  }
}
