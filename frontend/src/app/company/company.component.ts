import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const axios = require('axios');

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  companyNames: string[] = [];
  user: any = {};
  selectedCompanyId: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
    this.getCompanies();
    this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
    this.isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    if (this.isLoggedIn) {
      if (!this.isAdmin) {
        this.router.navigate(['/announcements']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  async getCompanies() {
    const request = await axios.get('http://localhost:8080/company');
    this.companyNames = request.data;
  }

  // getCompanyId() {
  //   localStorage.getItem('user');
  // }

  chooseCompany(value: string) {
    const selectedCompany = this.user.companies.filter(
      (company: any) => company.name === value
    );
    this.selectedCompanyId = selectedCompany[0].id;
    localStorage.setItem(
      'selectedCompanyId',
      this.selectedCompanyId.toString()
    );
    this.router.navigate(['/announcements']);
  }
}
