import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

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
  constructor(private router: Router) {}
  ngOnInit() {
    this.getCompanyUsers();
  }

  async getCompanyUsers() {
    const companyId = localStorage.getItem('selectedCompanyId');
    const request = await axios.get(
      `http://localhost:8080/company/${companyId}/users`
    );
    this.users = request.data.map((obj: any) => {
      return {
        name: `${obj.profile.firstname} ${obj.profile.lastName}`,
        email: obj.profile.email,
        active: obj.active,
        admin: obj.isAdmin,
        status: obj.status,
      };
    });
  }
}
