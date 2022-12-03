import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
