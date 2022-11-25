import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _UserService:UserService,
    private _AuthService:AuthService,
    private _Router:Router
  ) { }
  loginForm:FormGroup =  new FormGroup({
    'username' : new FormControl('', Validators.required ),
    'password' : new FormControl('', [Validators.required , Validators.minLength(3)]),
  })
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._Router.navigateByUrl('/')
    }
  }
  onSubmit(loginForm:FormGroup){
    console.log(loginForm.value);
    this._UserService.login(loginForm.value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token' ,  response.token)
        this._Router.navigateByUrl('/')
        // localStorage.setItem('userArray' ,  response)
        this._AuthService.saveCurrentUser();
      }, error => {
        if(error){

          console.log(error);
        }
      }
    )
  }
}
