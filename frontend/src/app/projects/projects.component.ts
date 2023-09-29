import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  teamName: string = '';
  teamId: number = 0;
  companyId: string = this.dataService.getCompany().toString();
  showForm: boolean = false;
  inputOne: string = 'Project Name';
  inputTwo: string = 'Description';
  error: string = '';

  constructor(private router: Router, private dataService: DataService) {
    const input = this.router.getCurrentNavigation();
    const receivedTeamName = input?.extras?.state?.['teamName'];
    if (receivedTeamName) this.teamName = receivedTeamName;
    const receivedTeamId = input?.extras?.state?.['teamId'];
    if (receivedTeamId) this.teamId = receivedTeamId;
  }

  ngOnInit() {
    this.getProjects();
  }

  async getProjects() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`
    );
    this.projects = request.data;
  }

  async onSubmission(formData: any) {
    console.log(formData);
    const newProject = {
      name: formData['Project Name'],
      description: formData['Description'],
    };
    try {
      await axios.post(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`,
        newProject
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.getProjects();
  }

  showOverlay() {
    this.showForm = !this.showForm;
  }

  closeOverlay() {
    this.showForm = false;
  }
}
