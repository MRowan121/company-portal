import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { getFullUser } from 'src/app/http-requests';

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

  async ngOnInit() {
    this.getIdsFromUrl();
    this.user = await getFullUser(this.userId);
    this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`;
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

  logOut() {
    localStorage.setItem('isLoggedIn', 'false');
  }
}
