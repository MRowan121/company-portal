import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
})
export class NewUserModalComponent implements OnInit {
  formData: any = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    admin: 'none',
  };

  @Output() hideOverlay = new EventEmitter<any>();
  @Output() formSubmitted = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  onSubmit() {
    console.log(this.formData);
    console.log('sup');
    this.formSubmitted.emit(this.formData);
  }

  closeOverlay() {
    this.hideOverlay.emit();
  }
}
