import { outputAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  user: any = {};
  isAdmin: Boolean = false;
  isLoggedIn: Boolean = false;
  error: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    // this.isLoggedIn =
    //   localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    // this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
    // if (localStorage.getItem('isAdmin') === null) {
    //   localStorage.setItem('isAdmin', 'false');
    // }
    if (this.isLoggedIn) {
      if (this.isAdmin) {
        this.router.navigate(['/select-company']);
      }
      if (!this.isAdmin) {
        this.router.navigate(['/announcements']);
      }
    }
  }

  getUsername(value: string) {
    this.username = value;
  }

  getPassword(value: string) {
    this.password = value;
  }

  async validateUser(e: any) {
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
      this.user = request.data;
      this.isLoggedIn = true;

      if (request.data) {
        this.isAdmin = true;
      }
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['select-company']);
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
  }
}
