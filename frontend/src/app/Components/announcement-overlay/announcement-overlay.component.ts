import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { DataService } from 'src/app/data.service';
import { AnnouncementDTO } from 'src/app/interfaces';

@Component({
  selector: 'app-announcement-overlay',
  templateUrl: './announcement-overlay.component.html',
  styleUrls: ['./announcement-overlay.component.css'],
})
export class AnnouncementOverlayComponent implements OnInit {
  title: string = '';
  message: string = '';
  submitted: boolean = false;
  companyId: string = this.dataService.getCompany().toString();
  error: string = '';

  @Output() hideOverlay = new EventEmitter<any>();

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  getTitle(value: string) {
    this.title = value;
  }

  getMessage(value: string) {
    this.message = value;
  }

  async onSubmit() {
    const newMessage = {
      title: this.title,
      message: this.message,
    };
    try {
      const request = await axios.post(
        `http://localhost:8080/company/${this.companyId}/announcements`,
        newMessage
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
    window.location.reload();
  }
}
