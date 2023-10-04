import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
})
export class CreateModalComponent implements OnInit {
  formData: any = {};

  @Input() inputOne: string = '';
  @Input() inputTwo: string = '';
  @Input() projectData: any;
  @Input() showEditForm: boolean = false;
  @Input() showTeamForm: boolean = false;
  @Input() users: any[] = [];
  @Output() hideOverlay = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {
    this.loadProjectData();
  }

  onSubmit() {
    this.formSubmitted.emit(this.formData);
  }

  closeOverlay() {
    this.hideOverlay.emit();
  }

  loadProjectData() {
    if (this.projectData) {
      this.formData.name = this.projectData.name;
      this.formData.description = this.projectData.description;
      this.formData.active = this.projectData.active;
    }
  }
}
