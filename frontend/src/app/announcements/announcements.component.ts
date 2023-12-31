import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AnnouncementDto } from '../interfaces';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import {
  getCompanyIdFromUrl,
  getFullUser,
  getUserIdFromUrl,
} from '../utility-functions';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  announcements: AnnouncementDto[] = [];
  companyId: string | null = '';
  error: string = '';
  isLoggedIn: boolean = false;
  showForm: boolean = false;
  user: any = {};
  userId: string | null = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.userId = getUserIdFromUrl();
    this.companyId = getCompanyIdFromUrl();
    this.user = await getFullUser(this.userId);
    this.getAnnouncements();
  }

  async getAnnouncements() {
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
      title: formData.name,
      message: formData.description,
      author: {
        id: this.user.id,
        profile: this.user.profile,
        admin: this.user.admin,
        active: this.user.active,
        status: this.user.status,
      },
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
