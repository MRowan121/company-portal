import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-announcement-overlay',
  templateUrl: './announcement-overlay.component.html',
  styleUrls: ['./announcement-overlay.component.css'],
})
export class AnnouncementOverlayComponent implements OnInit {
  title: string = '';
  message: string = '';
  submitted: boolean = false;

  @Output() hideOverlay = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
  }

  closeOverlay() {
    this.hideOverlay.emit();
  }
}
