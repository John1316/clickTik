import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/modules/models/products.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCategories():Observable<any>{
    return this._HttpClient.get<string[]>(`${environment.apiUrl}products/categories`)
  }
  getProducts():Observable<any>{
    return this._HttpClient.get<IProduct>(`${environment.apiUrl}products?limit=100`)
  }
  filterByCategory(category_name:string):Observable<any>{
    return this._HttpClient.get<IProduct>(`${environment.apiUrl}products/category/${category_name}`)
  }
  filteredProducts(query:string):Observable<any>{
    return this._HttpClient.get<IProduct>(`${environment.apiUrl}products/search?q=${query}`)
  }
  getCart(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}carts/user/${userId}`)
  }
  addToCart(postData: any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}carts/add`, postData)
  }
  updateToCart(postData: any, user_id:string):Observable<any>{
    return this._HttpClient.put(`${environment.apiUrl}carts/${user_id}`, postData)
  }
}
