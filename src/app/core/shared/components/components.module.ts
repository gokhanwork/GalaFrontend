import { UnitTypeComponent } from './unit-type/unit-type.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataPropertyGetterPipe } from '../../pipes/data-property-getter.pipe';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrandSelectComponent } from './brand-select/brand-select.component';



@NgModule({
  declarations: [
    TableComponent,
    DataPropertyGetterPipe,
    UnitTypeComponent,
    BrandSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    InlineSVGModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    TableComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    UnitTypeComponent,
    BrandSelectComponent
  ],
})
export class ComponentsModule { }
