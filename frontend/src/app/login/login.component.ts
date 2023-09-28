import { outputAst } from '@angular/compiler';
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
  user: any;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  error: string = '';
  
  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {
    // this.isLoggedIn =
    //   localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    // this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
    // if (localStorage.getItem('isAdmin') === null) {
    //   localStorage.setItem('isAdmin', 'false');
    // }


    // if (this.isLoggedIn) {
    //   if (this.user.admin) {
    //     this.router.navigate(['/select-company']);
    //   }
    //   if (!this.user.admin) {
    //     this.router.navigate(['/announcements']);
    //   }
    // }
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

      //Setting the user from backend**************
      this.user = request.data;
      this.isAdmin = request.data.admin;
      this.dataService.setUser(this.user);
      this.dataService.setIsAdmin(this.isAdmin)
      // console.log(this.user.admin);
      console.log('adddmin', this.isAdmin);


      //Routing after logging
      this.isLoggedIn = true;
      this.dataService.setIsLoggedIn(this.isLoggedIn);

        if (this.isAdmin) {
          console.log("Route for select-company");
          this.router.navigate(['/select-company']);
        }
        if (!this.isAdmin) {
          console.log("Route for announcments");
          this.router.navigate(['/announcements']);
        }

    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
  }
}
