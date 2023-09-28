import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  @Input() inputOne: string = ''
  @Input() inputTwo: string = ''

  formData: any = {}

  constructor() {}

  ngOnInit() {}

  onSubmit() {
   console.log(this.formData);
   this.formSubmitted.emit(this.formData)
  }
}
