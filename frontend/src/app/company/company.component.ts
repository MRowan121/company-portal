import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
const axios = require('axios');

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) {}
  
  isAdmin: boolean = this.dataService.getisAdmin();
  isLoggedIn: boolean = this.dataService.getIsLoggedIn();
  companyNames: string[] = [];
  user: any = this.dataService.getUser();
  selectedCompanyId: number = 0;

  ngOnInit() {
    // const savedUser = localStorage.getItem('user');
    // if (savedUser) {
    //   this.user = JSON.parse(savedUser);
    // }
    console.log('user com[', this.user)
    console.log('administerrrr', this.isAdmin)
    this.getCompanies();
    // this.isAdmin = this.isAdmin === true ? true : false;
    // this.isLoggedIn = this.isLoggedIn === true ? true : false;
    if (this.isLoggedIn) {
      if (!this.isAdmin) {
        this.router.navigate(['/announcements']);
      }
    } else {
      this.router.navigate(['/select-company']);
    }
  }

  async getCompanies() {
    const request = await axios.get('http://localhost:8080/company');
    this.companyNames = request.data;
    console.log('rezzz', request)
  }

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
