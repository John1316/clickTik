import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogined:boolean = false;
  totalCartItems!: number;
  constructor(
    private _AuthService:AuthService,
    private _ApiService:ApiService,
    private _Router:Router
  ) { }

  ngOnInit(): void {
    this.authentication()
    this._ApiService.getCart(localStorage.getItem('user_id') || '{}').subscribe(
      (response) => {
        this.totalCartItems = response.carts[0].totalProducts;
      }
    )

  }
  searchString(event:any){
    console.log(event.target.value);
    if(event.target.value !== ''){
      this._Router.navigate(['/products'] , { queryParams: {searchKey:event.target.value}})
    }if(event.target.value === ''){
      this._Router.navigate(['/products'])
    }
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
