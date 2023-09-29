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
