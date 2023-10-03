import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AnnouncementDto } from '../interfaces';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { getFullUser } from '../http-requests';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  isLoggedIn: boolean = false;
  companyId: string | null = '';
  userId: string | null = '';
  announcements: AnnouncementDto[] = [];
  showForm: boolean = false;
  error: string = '';
  user: any = {};

  inputOne: string = 'Title';
  inputTwo: string = 'Message';

  constructor(private router: Router) {}

  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.getIdsFromUrl();
    this.user = await getFullUser(this.userId);
    this.getAnnouncements();
  }

  getIdsFromUrl() {
    const url = location.href;
    const userMatch = url.match(/\/user\/(\d+)\//);
    const companyMatch = url.match(/\/company\/(\d+)\//);

    if (userMatch && companyMatch) {
      this.userId = userMatch[1];
      this.companyId = companyMatch[1];
    }
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
