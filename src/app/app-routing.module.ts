import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  redirectTo: 'products' , pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./modules/components/login/login.module').then(m => m.LoginModule) },
  { path: 'products', loadChildren: () => import('./modules/components/products/products.module').then(m => m.ProductsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
