import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DataService } from '../data.service';

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
  user: any = this.dataService.getUser();
  isModalHidden: boolean = true;
  inputOne: string = 'title';
  inputTwo: string = 'message';
  newAnnouncement: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAnnouncements();
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
        firstName: obj.author.profile.firstname,
        lastName: obj.author.profile.lastname,
        message: obj.message,
        date: `${month} ${day}, ${year}`,
      };
    });
  }

  toggleModal() {
    this.isModalHidden
      ? (this.isModalHidden = false)
      : (this.isModalHidden = true);

    console.log(this.isModalHidden);
  }

  onAnnouncementSubmission(announcement: any) {
    console.log(this.user);
    console.log(announcement)
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
