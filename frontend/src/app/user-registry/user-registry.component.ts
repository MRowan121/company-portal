import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { getCompanyIdFromUrl, getCompanyUsers } from '../utility-functions';
import { FullUserDto } from '../interfaces';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent implements OnInit {
  companyId: string | null = '';
  error: string = '';
  showForm: boolean = false;
  users: FullUserDto[] = [];

  constructor(private router: Router) {}
  async ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/']);
    }
    this.companyId = getCompanyIdFromUrl();
    this.users = await getCompanyUsers(this.companyId);
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
    this.users = await getCompanyUsers(this.companyId);
  }

  showOverlay() {
    this.showForm = !this.showForm;
  }

  closeOverlay() {
    this.showForm = false;
  }
}
