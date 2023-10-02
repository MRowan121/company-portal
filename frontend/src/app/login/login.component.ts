import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  //
  loginForm: FormGroup;

  constructor(private router: Router, private dataService: DataService) {
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
      console.log(request.data);
      this.dataService.setUser(request.data);
      this.dataService.setIsAdmin(request.data.admin);
      localStorage.setItem('isAdmin', request.data.admin.toString());

      this.dataService.setIsLoggedIn(true);

      if (request.data.admin) {
        this.router.navigate(['/company']);
      } else {
        this.router.navigate([
          `company/${request.data.companies[0].id}/announcement`,
        ]);
      }
    } catch (err) {
      this.error = 'Invalid credentials. Please try again.';
      console.log(err);
    }
  }
}
