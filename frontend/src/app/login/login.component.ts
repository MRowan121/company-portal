import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {}

  getUsername(value: string) {
    this.username = value;
  }

  getPassword(value: string) {
    this.password = value;
  }

  async validateUser(e: MouseEvent) {
    e.preventDefault();
    this.error = '';
    if (this.username === '') {
      this.error = 'Username Empty';
      return;
    }
    if (this.password === '') {
      this.error = 'Password Empty';
      return;
    }

    const userToSubmit = {
      username: this.username,
      password: this.password,
    };
    try {
      const request = await axios.post(
        'http://localhost:8080/users/login',
        userToSubmit
      );

      this.dataService.setUser(request.data);
      this.dataService.setCompany(request.data.companies[0].id);
      this.dataService.setIsAdmin(request.data.admin);
      localStorage.setItem('isAdmin', request.data.admin.toString());

      this.dataService.setIsLoggedIn(true);

      if (request.data.admin) {
        this.router.navigate(['/select-company']);
      }
      if (!request.data.admin) {
        this.router.navigate(['/announcements']);
      }
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
  }
}
