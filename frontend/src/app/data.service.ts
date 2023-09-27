import {Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
    providedIn: 'root'

})

export class DataService{
    //keep track of admin account boolean
    //keep track of the active account boolean
    
    

    constructor(){}
    
    private user: any = {};
    private isAdmin: Boolean = false;

    getUser(){
        return this.user();

    }

    setUser(user: any){
        this.user = user; 

    }

    getisAdmin(): boolean{
        return this.user.admin;
    }

    




}
