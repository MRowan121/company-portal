import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {
  getCompanyIdFromUrl,
  getFullUser,
  getUserIdFromUrl,
} from 'src/app/utility-functions';

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
    this.userId = getUserIdFromUrl();
    this.companyId = getCompanyIdFromUrl();
    this.user = await getFullUser(this.userId);
    this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`;
  }

  logOut() {
    localStorage.setItem('isLoggedIn', 'false');
  }
}
