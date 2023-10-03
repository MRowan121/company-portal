import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from '../interfaces';
import axios from 'axios';
import { getUserIdFromUrl } from '../utility-functions';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companies: CompanyDto[] = [];
  userId: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userId = getUserIdFromUrl();
    this.getCompanies();
  }

  async getCompanies() {
    const request = await axios.get(`http://localhost:8080/company/`);
    this.companies = request.data.companies;
  }

  chooseCompany(value: string) {
    localStorage.setItem('selectedCompanyId', value);
    this.router.navigate([
      `user/${this.userId}/company/${value}/announcements`,
    ]);
  }
}
