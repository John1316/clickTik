import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCategories():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}products/categories`)
  }
  getProducts():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}products`)
  }
  filterByCategory(category_name:string):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}products/category/${category_name}`)
  }
}
