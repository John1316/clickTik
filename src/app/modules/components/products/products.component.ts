import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { IProduct } from '../../models/products.interface';

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
  categoriesTest !: string;
  products : IProduct[]= [];
  loading!:boolean;
  searchKey!:string;
  successAddToCart:string= '';
  constructor(private _ApiService:ApiService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router,
    private _Renderer2:Renderer2
    ) { }
    // show data
    // show categories
  // showCategories(){
  //   this.loading = true;
  //   this._ApiService.getCategories().subscribe(
  //     (response) => {
  //       this.categories = response;
  //       this.loading = false;

  //     }
  //   )
  // }
  // show products
  goBackHome(){
    this.showProducts();
    this._Router.navigate(['/'])

  }
  showProducts(){
    this.loading = true
    this._ApiService.getProducts().subscribe(
      (response) => {
        this.loading = false;
        this.products = response.products;
        this.filtered = false
        // get all categories from products
        let countArray = this.products.map(
          (responseData:IProduct) =>{
            return responseData.category;
          }
        )
        // get all counts

        let countsFunction = countArray.reduce((acc:any, value:any) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1
        }), []);
        // make the array of objects with data of name and count
        let categoriesArray = Object.entries(countsFunction).map(entry => {
          return {name: entry[0],  count:entry[1]};
        });
        this.categories = categoriesArray

      }
    )

  }
  // On filter
  onChange(event:any){
    this.loading = true;
    this._Router.navigate([`/product-details`, event.target.value])
  }
  // add to cart form
  addToCart:FormGroup = new FormGroup({
    'quantity': new FormControl('', Validators.required)
  })
  onSubmit(addToCart:FormGroup , id:number){
    console.log(addToCart.value, id);
    this._ApiService.updateToCart(
      {
        userId: localStorage.getItem('user_id'),
        products: [
          {
            id: id,
            quantity: addToCart.value.quantity
          }

        ]
      },
      JSON.parse(localStorage.getItem('user_id') || '{}')
    ).subscribe(
      (response) => {
        console.log(response);
        this.successAddToCart = 'Product added successfully';
      }, error => {
        console.log(error);
      }
    )
  }
    // close toastr
  closeToastr(){
    let closeToastr =  document.querySelector('.toast')
    this._Renderer2.addClass(closeToastr, 'closed')
  }
  // on Search
  onSearchProduct(){
    this._ActivatedRoute.queryParamMap.subscribe(
      (params:Params) => {
        if(params['params'].searchKey !== undefined){

          this.loading = true;
          this.searchKey =   params['params'].searchKey
          this._ApiService.filteredProducts(params['params'].searchKey).subscribe(
            (response) => {
              console.log(response);
              this.products = response.products;
              this.filtered = true;
              this.filteredLimit = response.total;
              this.loading = false;
            }
          )
        }
        if(params['params'].searchKey === undefined){
          this.showProducts();
          this.filtered = false;

        }
      }
    )
  }
  ngOnInit(): void {
    // this.showCategories();
    this.showProducts();
    this.onSearchProduct()
  }

}
