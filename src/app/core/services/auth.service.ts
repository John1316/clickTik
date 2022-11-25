import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:any = new BehaviorSubject(null)
  constructor(
    private _Router:Router
  ) {
    if (localStorage.getItem('token')) {
      this.saveCurrentUser();
    }
  }
  saveCurrentUser(){
    let token: any = localStorage.getItem('token')
    this.currentUser.next(token)
  }
  signOut(){
    this.currentUser.next(null);
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
