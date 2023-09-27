import { Component, OnInit } from '@angular/core';
const axios = require('axios')

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit{
  announcements: any[] = [];
  companyId: string | null = ""
  constructor(){}
    ngOnInit() {
      // console.log(this.companyId);
      this.getAnnouncements();
    }
    
    async getAnnouncements(){
      this.companyId = localStorage.getItem('selectedCompanyId')
      // const request = await axios.get("http://localhost:8080/company/"+this.companyId+"/announcements")
      const request = await axios.get(`http://localhost:8080/company/${this.companyId}/announcements`)
      this.announcements = request.data
      console.log(request.data);
      console.log(this.announcements)
    }
}

