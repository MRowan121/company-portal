import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAdmin: string | null = localStorage.getItem('isAdmin');
  userName: string = '';
  user: any = {};
  companyId: string | null = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getCompanyId();
    this.user = this.dataService.getUser();
    this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`;
  }

  getCompanyId() {
    const url = location.href;
    const match = url.match(/\/company\/(\d+)\//);

    if (match) {
      this.companyId = match[1];
    }
  }

  logOut() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isAdmin', 'false');
  }
}
