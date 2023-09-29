import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  isAdmin: string | null = localStorage.getItem('isAdmin');
  isLoggedIn: boolean = this.dataService.getIsLoggedIn();
  companyNames: any[] = [];
  user: any = this.dataService.getUser();
  selectedCompanyId: number = 0;

  ngOnInit() {
    this.getCompanies();
    if (this.isLoggedIn) {
      if (this.isAdmin === 'false') {
        this.router.navigate(['/announcements']);
      }
    } else {
      this.router.navigate(['/select-company']);
    }
  }

  async getCompanies() {
    this.companyNames = this.user.companies.map((company: any) => company.name);
  }

  chooseCompany(value: string) {
    const selectedCompany = this.user.companies.filter(
      (company: any) => company.name === value
    );
    this.dataService.setCompany(selectedCompany[0].id);
    this.selectedCompanyId = selectedCompany[0].id;
    localStorage.setItem(
      'selectedCompanyId',
      this.selectedCompanyId.toString()
    );
    this.router.navigate(['/announcements']);
  }
}
