import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/modules/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }
  login(
    loginData: IUser
  ):Observable<IUser>{
    return this._HttpClient.post<IUser>(`${environment.apiUrl}auth/login`, loginData)
  }
}
