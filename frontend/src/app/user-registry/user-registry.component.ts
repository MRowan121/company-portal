import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { getCompanyIdFromUrl } from '../utility-functions';

interface User {
  name: string;
  email: string;
  active: boolean;
  admin: boolean;
  status: string;
}

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent implements OnInit {
  users: User[] = [];
  showForm: boolean = false;
  error: string = '';
  companyId: string | null = '';

  constructor(private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.companyId = getCompanyIdFromUrl();
    this.getCompanyUsers();
  }

  async getCompanyUsers() {
    const request = await axios.get(
      `http://localhost:8080/company/${this.companyId}/users`
    );
    this.users = request.data.map((obj: any) => {
      return {
        name: `${obj.profile.firstName} ${obj.profile.lastName}`,
        email: obj.profile.email,
        active: obj.active,
        admin: obj.admin,
        status: obj.status,
      };
    });
  }

  async onSubmission(formData: any) {
    const newUser = {
      credentials: {
        username: formData['username'],
        password: formData['password'],
      },
      profile: {
        firstName: formData['firstName'],
        lastName: formData['lastName'],
        phone: formData['phone'],
        email: formData['email'],
      },
      admin: formData['admin'],
    };
    try {
      await axios.post(
        `http://localhost:8080/company/${this.companyId}/user`,
        newUser
      );
    } catch (err) {
      this.error = 'Login Error';
      console.log(err);
    }
    this.closeOverlay();
    this.getCompanyUsers();
  }

  showOverlay() {
    this.showForm = !this.showForm;
  }

  closeOverlay() {
    this.showForm = false;
  }
}
