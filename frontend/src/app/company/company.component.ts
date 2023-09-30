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

  companyNames: any[] = [];
  user: any = this.dataService.getUser();
  selectedCompanyId: number = 0;

  ngOnInit() {
    this.getCompanies();
    console.log(this.user);
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
