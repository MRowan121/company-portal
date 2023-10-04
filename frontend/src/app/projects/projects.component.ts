import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ProjectDto } from '../interfaces';
import {
  getCompanyIdFromUrl,
  getFullUser,
  getTeamProjects,
  getUserIdFromUrl,
} from '../utility-functions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  companyId: string | null = '';
  error: string = '';
  selectedProject: any;
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  team: any = {};
  teamProjects: ProjectDto[] = [];
  user: any = {};
  userId: string | null = '';

  constructor(private router: Router) {
    const input = this.router.getCurrentNavigation();
    const receivedTeam = input?.extras?.state?.['team'];
    if (receivedTeam) this.team = receivedTeam;
  }

  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.userId = getUserIdFromUrl();
    this.companyId = getCompanyIdFromUrl();
    this.user = await getFullUser(this.userId);
    this.teamProjects = await getTeamProjects(this.companyId, this.team.id);
  }

  async onCreation(formData: any) {
    const newProject = {
      name: formData.name,
      description: formData.description,
    };
    try {
      await axios.post(
        `http://localhost:8080/company/${this.companyId}/teams/${this.team.id}/projects`,
        newProject
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.teamProjects = await getTeamProjects(this.companyId, this.team.id);
  }

  async onEdit(formData: any) {
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
        `http://localhost:8080/company/${this.companyId}/teams/${this.team.id}/projects/${this.selectedProject.id}`,
        updatedProject
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.teamProjects = await getTeamProjects(this.companyId, this.team.id);
  }

  showCreateOverlay() {
    this.showCreateForm = !this.showCreateForm;
  }

  showEditOverlay(project: any) {
    this.showEditForm = !this.showEditForm;
    this.selectedProject = project;
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
