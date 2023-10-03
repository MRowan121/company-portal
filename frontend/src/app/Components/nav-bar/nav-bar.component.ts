import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  user: any = {};
  companyId: string | null = '';
  userId: string | null = '';

  constructor() {}

  ngOnInit() {
    this.getIdsFromUrl();
    this.getFullUser();
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

  async getFullUser() {
    const request = await axios.get(
      `http://localhost:8080/users/${this.userId}`
    );
    this.user = request.data;
    this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`;
  }

  logOut() {
    localStorage.setItem('isLoggedIn', 'false');
  }
}
