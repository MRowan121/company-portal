import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAdmin: string | null = localStorage.getItem("isAdmin");
  userName: string = ""
  user: any = {}

  constructor(private dataService: DataService) {
  }

  ngOnInit(){
    console.log(this.isAdmin)
   this.user = this.dataService.getUser();
   console.log(this.user)
   this.userName = `${this.user.profile.firstName} ${this.user.profile.lastName[0]}.`
  }



  
  logOut(){
    localStorage.setItem('isLoggedIn', 'false')
    localStorage.setItem('isAdmin', 'false')
  }
  
  
}





