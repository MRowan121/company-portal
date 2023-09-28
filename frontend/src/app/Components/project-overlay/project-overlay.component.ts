import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-project-overlay',
  templateUrl: './project-overlay.component.html',
  styleUrls: ['./project-overlay.component.css'],
})
export class ProjectOverlayComponent implements OnInit {
  name: string = '';
  description: string = '';
  submitted: boolean = false;
  companyId: string = this.dataService.getCompany().toString();
  error: string = '';

  @Input() teamId: number;
  @Output() hideOverlay = new EventEmitter<any>();

  constructor(private dataService: DataService) {
    this.teamId = 0;
  }

  ngOnInit() {}

  getName(value: string) {
    this.name = value;
  }

  getDescription(value: string) {
    this.description = value;
  }

  async onSubmit() {
    const newProject = {
      name: this.name,
      description: this.description,
    };
    try {
      const request = await axios.post(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`,
        newProject
      );
      console.log(request.data);
      this.closeOverlay();
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
  }

  closeOverlay() {
    this.hideOverlay.emit();
    // window.location.reload();
  }
}
