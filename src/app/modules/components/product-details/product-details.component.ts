import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { IProduct } from '../../models/products.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  page: number = 1;
  filteredLimit!:number;
  filtered:boolean =  false;
  categories: string[]= [];
  products: IProduct[]= [];
  loading!:boolean;
  categorySelected!:string;
  successAddToCart: string = '';
  constructor(private _ApiService:ApiService,
    private _ActivatedRoute:ActivatedRoute,
    private _Renderer2:Renderer2,
    private _Router:Router
    ) { }
  showCategories(){
    this.loading = true;
    this._ApiService.getCategories().subscribe(
      (response) => {
        this.categories = response;
        this.loading = false;

      }
    )
  }
  onChange(event:any){
    this.loading = true;

    this._Router.navigate([`/product-details`, event.target.value])
  }

  showProducts(){
    this._ActivatedRoute.paramMap.subscribe(
      (params:Params) => {
        this.loading = true;
        this.categorySelected = params['params'].category;
        this._ApiService.filterByCategory(params['params'].category).subscribe(
          (response) => {
            console.log(response);
            this.loading = false;
            this.products = response.products;
            this.filteredLimit = response.total;

            // let countArray = this.products.forEach(
            //   (responseData:IProduct) =>{
            //     console.log(responseData.category);

            //   }
            // )
          }
        )

      }
    )

  }
  closeToastr(){
    let closeToastr =  document.querySelector('.toast')
    this._Renderer2.addClass(closeToastr, 'closed')
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
  onSearchProduct(){
    this._ActivatedRoute.queryParamMap.subscribe(
      (params:Params) => {
        if(params['params'].searchKey !== undefined){

          this.loading = true;

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
    this.showCategories();
    this.showProducts();
    this.onSearchProduct()
  }

}
