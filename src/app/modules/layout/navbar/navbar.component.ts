import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogined:boolean = false;
  constructor(
    private _AuthService:AuthService
  ) { }

  ngOnInit(): void {
    this.authentication()
  }
  authentication(){
    this._AuthService.currentUser.subscribe(() => {
      console.log(this._AuthService.currentUser.getValue() == null);
      if (this._AuthService.currentUser.getValue() == null) {
        this.isLogined = false;
      } else {
        this.isLogined = true
      }
    })
  }
  logout(){
    this._AuthService.signOut()
  }
}
