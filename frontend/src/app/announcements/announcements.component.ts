import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DataService } from '../data.service';
import { AnnouncementDTO } from '../interfaces';
import { from } from 'rxjs';

interface Announcement {
  firstName: string;
  lastName: string;
  message: string;
  date: string;
}

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  companyId: string = this.dataService.getCompany().toString();
  announcements: Announcement[] = [];
  user: any = {};
  isAdmin: string | null = localStorage.getItem('isAdmin');
  showForm: boolean = false;
  error: string = '';
  inputOne: string = 'Title';
  inputTwo: string = 'Message';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAnnouncements();
  }

  async getAnnouncements() {
    const apiUrl: string = `http://localhost:8080/company/${this.companyId}/announcements`;
    const observable = from(axios.get<any>(apiUrl));

    observable.subscribe({
      next: (response) => {
        const data = response.data;
        this.announcements = data
          .map((obj: AnnouncementDTO) => {
            return {
              firstName: obj.author.profile.firstName,
              lastName: obj.author.profile.lastName,
              message: obj.message,
              date: new Date(obj.date),
            };
          })
          .sort((a: any, b: any) => b.date - a.date);
      },
    });
  }

  async onAnnouncementSubmission(formData: any) {
    console.log(formData);
    const newMessage = {
      title: formData.Title,
      message: formData.Message,
    };
    try {
      const request = await axios.post(
        `http://localhost:8080/company/${this.companyId}/announcements`,
        newMessage
      );
      console.log(request.data);
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
