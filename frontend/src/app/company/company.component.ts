import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CompanyDto } from '../interfaces';
import axios from 'axios';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  companies: CompanyDto[] = [];

  ngOnInit() {
    this.getCompanies();
  }

  async getCompanies() {
    const request = await axios.get(`http://localhost:8080/company/`);
    this.companies = request.data.companies;
  }

  chooseCompany(value: string) {
    this.dataService.setCompany(+value);
    this.router.navigate(['/announcements']);
  }
}
