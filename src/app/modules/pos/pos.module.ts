import { PosProductComponent } from './components/pos-product/pos-product.component';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [PosProductComponent,PosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PosRoutingModule
  ]
})
export class PosModule { }
