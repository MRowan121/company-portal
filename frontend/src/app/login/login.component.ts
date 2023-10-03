import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  ngOnInit() {}

  async validateUser() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const credentials = {
      username: username,
      password: password,
    };
    try {
      const request = await axios.post(
        'http://localhost:8080/users/login',
        credentials
      );
      localStorage.setItem('isLoggedIn', 'true');

      if (request.data.admin) {
        this.router.navigate([`user/${request.data.id}/company`]);
      } else {
        this.router.navigate([
          `user/${request.data.id}/company/${request.data.companies[0].id}/announcements`,
        ]);
      }
    } catch (err) {
      this.error = 'Invalid credentials. Please try again.';
      console.log(err);
    }
  }
}
