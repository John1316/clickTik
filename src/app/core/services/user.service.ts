import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }
  login(
    loginData: Object
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}auth/login`, loginData)
  }
}
