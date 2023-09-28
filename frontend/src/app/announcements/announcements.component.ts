import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AnnouncementDTO } from '../interfaces';

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
  // isAdmin: boolean = this.dataService.getIsAdmin();
  isAdmin: string | null = localStorage.getItem('isAdmin');
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.getAnnouncements();
    // localStorage.getItem("isAdmin")
  }

  async getAnnouncements() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/announcements`
    );
    this.announcements = request.data
      .map((obj: AnnouncementDTO) => {
        return {
          firstName: obj.author.profile.firstName,
          lastName: obj.author.profile.lastName,
          message: obj.message,
          date: new Date(obj.date),
        };
      })
      .sort((a: any, b: any) => b.date - a.date);
  }
}
