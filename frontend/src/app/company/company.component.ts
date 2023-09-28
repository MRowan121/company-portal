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
  companyNames: any[] = [];
  user: any = this.dataService.getUser();
  selectedCompanyId: number = 0;

  ngOnInit() {
    console.log('user com[', this.user)
    console.log('administerrrr', this.isAdmin)
    this.getCompanies();
    if (this.isLoggedIn) {
      if (!this.isAdmin) {
        this.router.navigate(['/announcements']);
      }
    } else {
      this.router.navigate(['/select-company']);
    }
  }

  async getCompanies() {
    
    this.companyNames = this.user.companies.map((company: any) => company.name)
  }

  chooseCompany(value: string) {
    const selectedCompany = this.user.companies.filter(
      (company: any) => company.name === value
    );
    console.log(selectedCompany[0].id)
    this.selectedCompanyId = selectedCompany[0].id;
    localStorage.setItem(
      'selectedCompanyId',
      this.selectedCompanyId.toString()
    );
    this.router.navigate(['/announcements']);
  }
}
