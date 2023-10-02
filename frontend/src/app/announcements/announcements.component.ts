import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AnnouncementDto } from '../interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  companyId: string | null = '';
  announcements: AnnouncementDto[] = [];
  isAdmin: string | null = '';
  showForm: boolean = false;
  error: string = '';

  inputOne: string = 'Title';
  inputTwo: string = 'Message';

  constructor() {}

  ngOnInit() {
    this.getAnnouncements();
  }

  async getAnnouncements() {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.companyId = localStorage.getItem('selectedCompanyId');
    const apiUrl: string = `http://localhost:8080/company/${this.companyId}/announcements`;
    const observable = from(axios.get<any>(apiUrl));

    observable.subscribe({
      next: (response) => {
        this.announcements = response.data.sort(
          (a: any, b: any) => b.date - a.date
        );
      },
    });
  }

  async onSubmit(formData: any) {
    const newAnnouncement = {
      title: formData.Title,
      message: formData.Message,
    };
    try {
      await axios.post(
        `http://localhost:8080/company/${this.companyId}/announcements`,
        newAnnouncement
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.getAnnouncements();
  }

  showOverlay() {
    this.showForm = !this.showForm;
  }

  closeOverlay() {
    this.showForm = false;
  }
}
