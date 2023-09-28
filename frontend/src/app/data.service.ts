import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  //keep track of admin account boolean
  //keep track of the active account boolean

  private user: any;
  private isAdmin: boolean = false;
  private isLoggedIn: boolean = false;

  constructor() {}

  getUser() {
    return this.user;
  }

  setUser(user: any) {
    this.user = user;
  }

  getisAdmin(): boolean {
    return this.isAdmin;
  }

  setIsAdmin(boolean: boolean) {
    this.isAdmin = boolean;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  setIsLoggedIn(boolean: boolean) {
    this.isLoggedIn = boolean;
  }
}
