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
  constructor(private router: Router, private dataService: DataService) {
    const input = this.router.getCurrentNavigation();
    const receivedProjects = input?.extras?.state?.['projects'];
    if (receivedProjects) this.projects = receivedProjects;
    const receivedTeamName = input?.extras?.state?.['teamName'];
    if (receivedTeamName) this.teamName = receivedTeamName;
  }


  ngOnInit() {
    console.log(this.projects);
    console.log(this.teamName);
  }
}
