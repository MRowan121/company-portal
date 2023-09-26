import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ""
  password: string = ""
  user: any = {}

  //want to take username given from input on login page and parse through database to see if user exists
  getUsername(value: string){
    this.username = value;
    localStorage.setItem("user", this.username)
    console.log(this.username)
  }

  getPassword(value:string){
    this.password = value;
    localStorage.setItem("password", this.password)
    console.log(this.password)
  }

  // authenticateUser(userList = []){

  //   for(let users in userList)
  //   if(this.username exists in userList){
  //     user = userbyusername in repo

  //   }else{
  //     error for no user by that username
  //   }

  //   if(this.user.password !== this.password){
  //     error for wrong password
  //   }

  //   log user in
  // }
}




