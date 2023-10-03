import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ProjectDto } from '../interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  // projects: any[] = [];
  teamName: string = '';
  teamId: number = 0;
  teamProjects: ProjectDto[] = [];
  companyId: string | null = '';
  userId: string | null = '';
  user: any = {};
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  inputOne: string = 'Project Name';
  inputTwo: string = 'Description';
  error: string = '';
  selectedProject: any;
  selectedTeam: any = {};

  constructor(private router: Router) {
    const input = this.router.getCurrentNavigation();
    const receivedTeamName = input?.extras?.state?.['teamName'];
    if (receivedTeamName) this.teamName = receivedTeamName;
    const receivedTeamId = input?.extras?.state?.['teamId'];
    if (receivedTeamId) this.teamId = receivedTeamId;
    const receivedTeamProjects = input?.extras?.state?.['teamProjects'];
    if (receivedTeamProjects) this.teamProjects = receivedTeamProjects;
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.getIdsFromUrl();
    this.getFullUser();
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

  async getFullUser() {
    const request = await axios.get(
      `http://localhost:8080/users/${this.userId}`
    );
    this.user = request.data;
  }

  async getProjects() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`
    );
    this.teamProjects = request.data;
  }

  async onCreation(formData: any) {
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

  async onEdit(formData: any) {
    this.getCurrentTeam();
    const formDataValues = Object.values(formData);
    const updatedProject = {
      id: this.selectedProject.id,
      name: formDataValues[0],
      description: formDataValues[1],
      active: formDataValues[2],
      team: this.selectedProject.team,
    };
    try {
      await axios.patch(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects/${this.selectedProject.id}`,
        updatedProject
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.getProjects();
    this.inputOne = 'Project Name';
    this.inputTwo = 'Description';
  }

  async getCurrentTeam() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/teams`
    );
    this.selectedTeam = request.data.filter(
      (obj: any) => obj.id === this.teamId
    );
  }

  showCreateOverlay() {
    this.showCreateForm = !this.showCreateForm;
  }

  showEditOverlay(project: any) {
    this.showEditForm = !this.showEditForm;
    this.selectedProject = project;
    this.inputOne = project.name;
    this.inputTwo = project.description;
  }

  showOverlay() {
    if (this.showCreateForm) {
      this.showCreateForm = !this.showCreateForm;
    } else if (this.showEditForm) {
      this.showEditForm = !this.showEditForm;
    }
  }

  closeOverlay() {
    this.showEditForm = false;
    this.showCreateForm = false;
  }

  goBack() {
    this.router.navigateByUrl(
      `/user/${this.userId}/company/${this.companyId}/teams`
    );
  }
}
