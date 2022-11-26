import { Component, OnInit, Renderer2 } from '@angular/core';
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
  error!: string;
  loading!:boolean;
  constructor(
    private _UserService:UserService,
    private _AuthService:AuthService,
    private _Router:Router,
    private _Renderer2:Renderer2
  ) { }
  loginForm:FormGroup =  new FormGroup({
    'username' : new FormControl('', Validators.required ),
    'password' : new FormControl('', [Validators.required , Validators.minLength(3)]),
  })
  ngOnInit(): void {

  }
  closeToastr(){
    let closeToastr =  document.querySelector('.toast')
    this._Renderer2.addClass(closeToastr, 'closed')
  }
  onSubmit(loginForm:FormGroup){
    this._UserService.login(loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token' ,  response.token)
        localStorage.setItem('user_id' ,  response.id)
        localStorage.setItem('username' ,  response.username)
        this._Router.navigate(['/products'])
        this.loading = true
        // localStorage.setItem('userArray' ,  response)
        this._AuthService.saveCurrentUser();
      }, error => {
          this.error = error.error.message
      }
    )
  }
}
