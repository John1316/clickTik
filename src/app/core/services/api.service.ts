import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductResponse } from 'src/app/modules/models/products.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCategories():Observable<any>{
    return this._HttpClient.get<IProductResponse>(`${environment.apiUrl}products/categories`)

  }
  // get products

  getProducts():Observable<IProductResponse>{
    return this._HttpClient.get<IProductResponse>(`${environment.apiUrl}products?limit=100`)
  }
    // filtered category

  filterByCategory(category_name:string):Observable<IProductResponse>{
    return this._HttpClient.get<IProductResponse>(`${environment.apiUrl}products/category/${category_name}`)
  }
  // filtered products
  filteredProducts(query:string):Observable<IProductResponse>{
    return this._HttpClient.get<IProductResponse>(`${environment.apiUrl}products/search?q=${query}`)
  }
    // get cart

  getCart(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}carts/user/${userId}`)
  }
  // add to cart
  addToCart(postData: any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}carts/add`, postData)
  }
  // update to cart
  updateToCart(postData: any, user_id:string):Observable<any>{
    return this._HttpClient.put(`${environment.apiUrl}carts/${user_id}`, postData)
  }
}
