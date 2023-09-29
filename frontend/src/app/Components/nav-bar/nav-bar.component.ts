import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`;
  }

  logOut() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isAdmin', 'false');
  }
}
