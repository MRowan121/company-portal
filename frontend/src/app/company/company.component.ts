import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(){
    this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true:false
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true:false
    if(this.isLoggedIn){
      if(!this.isAdmin){
        this.router.navigate(['/announcements'])
      }
    }else{
      this.router.navigate(['/'])
    }
  }

}
