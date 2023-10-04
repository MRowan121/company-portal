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
    try {
      const { username, password } = this.loginForm.value;

      const response = await axios.post('http://localhost:8080/users/login', {
        username,
        password,
      });
      localStorage.setItem('isLoggedIn', 'true');
      const { id, admin, companies } = response.data;

      if (admin) {
        this.router.navigate([`user/${id}/company`]);
      } else {
        this.router.navigate([
          `user/${id}/company/${companies[0].id}/announcements`,
        ]);
      }
    } catch (err) {
      this.error = 'Invalid credentials. Please try again.';
      console.log(err);
    }
  }
}
