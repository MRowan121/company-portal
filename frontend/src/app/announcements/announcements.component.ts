import { Component, OnInit } from '@angular/core';
import axios from 'axios';


interface ProfileDTO {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface BasicUserDTO {
  id: number;
  profile: ProfileDTO;
  isAdmin: boolean;
  active: boolean;
  status: string;
}

interface AnnouncementDTO {
  id: number;
  date: string;
  title: string;
  message: string;
  author: BasicUserDTO;
}

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
  companyId: string | null = '';
  announcements: Announcement[] = [];
  user: any = {};

  constructor() {}

  ngOnInit() {
    this.getAnnouncements();
  }

  async getAnnouncements() {
    // this.companyId = localStorage.getItem('selectedCompanyId');
  
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/announcements`
    );
    this.announcements = request.data.map((obj: AnnouncementDTO) => {
      return {
        firstName: obj.author.profile.firstname,
        lastName: obj.author.profile.lastname,
        message: obj.message,
        date: obj.date,
      };
    });
  }
}
