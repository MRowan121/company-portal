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
  @Input() users: any[] = [];
  @Input() showTeamForm: boolean = false;
  @Input() showEditForm: boolean = false;
  @Output() hideOverlay = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  onSubmit() {
    this.formSubmitted.emit(this.formData);
  }

  closeOverlay() {
    this.hideOverlay.emit();
  }
}
