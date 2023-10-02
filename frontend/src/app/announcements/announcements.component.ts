import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AnnouncementDto, FullUserDto } from '../interfaces';
import { from } from 'rxjs';
import { DataService } from '../data.service';

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
  user: any = {};

  inputOne: string = 'Title';
  inputTwo: string = 'Message';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
    console.log(this.user);
    this.getAnnouncements();
  }

  getCompanyId() {
    const url = location.href;
    const match = url.match(/\/company\/(\d+)\//);

    if (match) {
      this.companyId = match[1];
    }
  }

  async getAnnouncements() {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.getCompanyId();
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
      author: {
        id: this.user.id,
        profile: this.user.profile,
        admin: this.user.admin,
        active: this.user.active,
        status: this.user.status,
      },
    };
    console.log(newAnnouncement);
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
