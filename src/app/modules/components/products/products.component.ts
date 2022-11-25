import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  page: number = 1;
  filteredLimit!:number;
  filtered:boolean =  false;
  categories : any[]= [];
  products : any[]= [];
  constructor(private _ApiService:ApiService) { }
  showCategories(){
    this._ApiService.getCategories().subscribe(
      (response) => {
        console.log(response);
        this.categories = response;
      }
    )
  }
  onChange(event:any){
    console.log(event.target.value);
    this._ApiService.filterByCategory(event.target.value).subscribe(
      (response) => {
        console.log(response);
        this.products = response.products
        this.filtered = true;
        this.filteredLimit = response.total;
      }
    )
    if(event.target.value == 'all'){
      this.showProducts()
    }
  }
  showProducts(){
    this._ApiService.getProducts().subscribe(
      (response) => {
        console.log(response);
        this.products = response.products;
      }
    )
  }
  ngOnInit(): void {
    this.showCategories()
    this.showProducts()
  }

}
