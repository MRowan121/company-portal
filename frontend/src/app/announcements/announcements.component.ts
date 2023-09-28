import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


interface ProfileDTO {
  firstName: string;
  lastName: string;
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
  companyId: string = this.dataService.getCompany().toString();
  announcements: Announcement[] = [];
  user: any = this.dataService.getUser();
  isModalHidden: boolean = true;
  inputOne: string = 'title';
  inputTwo: string = 'message';
  newAnnouncement: any;
  isAdmin: boolean = this.dataService.getIsAdmin();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAnnouncements();
    // localStorage.getItem("isAdmin")
  }

  async getAnnouncements() {
    // this.companyId = localStorage.getItem('selectedCompanyId');
    this.companyId = this.user.companies[0].id;
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/announcements`
    );
    console.log('reqqqq', request)
    this.announcements = request.data.map((obj: AnnouncementDTO) => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let date = new Date(obj.date);
      let day = date.getDate();
      let month = monthNames[date.getMonth()];
      let year = date.getFullYear();

      return {
        firstName: obj.author.profile.firstName,
        lastName: obj.author.profile.lastName,
        message: obj.message,
        date: `${month} ${day}, ${year}`,
      };
    }).sort((a: any,b: any)=> b.date - a.date);
  }

  toggleModal() {
    this.isModalHidden
      ? (this.isModalHidden = false)
      : (this.isModalHidden = true);

    console.log(this.isModalHidden);
  }

  onAnnouncementSubmission(announcement: any) {
    this.newAnnouncement = {
      title: announcement.title,
      message: announcement.message,
      user: this.user
    }

    axios.post(
      `http://localhost:8080/company/${this.user.companies[0].id}/announcements`, this.newAnnouncement
    ).then((response: any) => {
      console.log(response)
      //this.announcements.push(response.data)
      this.getAnnouncements()
    })

    this.isModalHidden = true;
  }
}
