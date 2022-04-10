import { PosProductComponent } from './components/pos-product/pos-product.component';
import { PosComponent } from './pos.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes:Routes = [
  {
    path: '',
    component: PosComponent,
    children: [
        {
          path:'pos',
          component: PosProductComponent
        }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
