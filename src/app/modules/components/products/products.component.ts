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
  keyValue!:string;
  successAddToCart:string= '';
  productCart!:IProduct;
  constructor(private _ApiService:ApiService,
  private _ActivatedRoute:ActivatedRoute,
  private _Router:Router,
  private _Renderer2:Renderer2,
  ) { }
    openModel(id:number, title:string){
      this.loading = true;
      this._ApiService.getProducts().subscribe(
        (response) => {
          let productCartArray = response.products.filter(
            (responseProduct:IProduct) => {
              return responseProduct.id == id
            }
          )
          this.productCart = productCartArray[0]
          this.loading = false;

        }
      )
      let modal = document.querySelector('.modal')
      let overlay = document.querySelector('.overlay')
      this._Renderer2.removeClass(modal, 'hidden')
      this._Renderer2.removeClass(overlay, 'hidden')
      console.log(id, title);
    }
    closeModal(){
      let modal = document.querySelector('.modal')
      let overlay = document.querySelector('.overlay')
      this._Renderer2.addClass(modal, 'hidden')
      this._Renderer2.addClass(overlay, 'hidden')
      this.addToCart.reset()
    }
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
    this._Router.navigate(['/'] ,   {queryParams: { 'filterKey': null, 'searchKey': null}})

  }
  showProducts(){
    this.loading = true
    this._ApiService.getProducts().subscribe(
      (response) => {
        this.loading = false;
        this.products = response.products;
        this.filtered = false
        // get all categories from products
        // let countArray = this.products.map(
        //   (responseData:IProduct) =>{
        //     return responseData.category;
        //   }
        // )
        // // get all counts

        // let countsFunction = countArray.reduce((acc:any, value:any) => ({
        //   ...acc,
        //   [value]: (acc[value] || 0) + 1
        // }), []);
        // // make the array of objects with data of name and count
        // let categoriesArray = Object.entries(countsFunction).map(entry => {
        //   return {name: entry[0],  count:entry[1]};
        // });
        // this.categories = categoriesArray

      }
    )

  }
  showCategories(){
    this._ApiService.getCategories().subscribe(
      (response)=> {
        this.categories = response
      }
    )
  }
  // On filter
  onChange(event:any){
    this.loading = true;
    this._Router.navigate([`/products`], {queryParams: {filterKey: event.target.value}})
    console.log(event.target.value);
    if(event.target.value === 'all'){
      this.goBackHome()
    }
  }
  // add to cart form
  addToCart:FormGroup = new FormGroup({
    'quantity': new FormControl('', Validators.required)
  })
  onSubmit(addToCart:FormGroup , id:number){
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
          this.keyValue =   params['params'].searchKey
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
  onFilterProduct(){
    this._ActivatedRoute.queryParams.subscribe(
      (params:Params) => {
        console.log(params['filterKey']);
        console.log(params['filterKey'] != undefined);
        if(params['filterKey'] != undefined){
          this.loading = true;
          this.keyValue = params['filterKey'];
          this._ApiService.filterByCategory(params['filterKey']).subscribe(
            (response) => {
              console.log(response);
              this.filtered = true;
              this.products = response.products;
              this.filteredLimit = response.total;
              this.loading = false;
            }
          )
        }else{
          this.showProducts();
          this.filtered = false;
        }
    })
  }
  ngOnInit(): void {
    this.showCategories();
    this.showProducts();
    this.onSearchProduct();
    this.onFilterProduct()
  }

}
