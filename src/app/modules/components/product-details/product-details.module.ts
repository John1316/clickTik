import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailsModule { }
