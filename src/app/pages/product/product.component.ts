import { ProductModel } from './models/productModel';
import { first } from 'rxjs/operators';
import { ProductService } from './services/product.service';
import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { ProductParams } from './models/productParams';
import { PaginatedFilter } from 'src/app/core/models/filters/PaginatedFilter';
import { Sort } from '@angular/material/sort';
import { PaginatedResult } from 'src/app/core/models/result/PaginatedResult';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading$: Observable<boolean>;
  products: PaginatedResult<ProductModel>;
  productColumns: TableColumn[];
  productParams = new ProductParams();
  searchString: string;

  constructor(private router: Router,private productService:ProductService,
    toast:ToastrService) {
      this.isLoading$ = this.productService.isLoading$;
     }

  ngOnInit(): void {
    this.getProducts();
    this.initColumns();
  }
  getProducts(){
    const productSubs = this.productService
    .getProducts(this.productParams)
    .pipe(first())
    .subscribe((response) => {
      if (response) {
        this.products = response;
        //console.log("Response",result)


      } else {
        console.log(response);
      }
    });
    this.unsubscribe.push(productSubs);

  }

  initColumns(): void {
    this.productColumns = [
      //{ name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Ürün Adı', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'Açıklaması', dataKey: 'description', isSortable: true, isShowable: true },
      { name: 'Kategori', dataKey: "category.name", isSortable: true, isShowable: true },
      { name: 'Alt Kategori', dataKey: "subCategory.name", isSortable: true, isShowable: true },
      { name: 'İşlem', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.productParams.pageNumber = event.pageNumber;
    this.productParams.pageSize = event.pageSize;
    this.getProducts();
  }
  openForm(product?: ProductModel): void {
    this.router.navigate(["/add"]);
  }

  remove($event: string): void {
  }

  sort($event: Sort): void {
    this.productParams.orderBy = $event.active + ' ' + $event.direction;
    console.log("Sort",this.productParams.orderBy);
    this.getProducts();
  }

  filter($event: string): void {
    this.productParams.searchString = $event.trim().toLocaleLowerCase();
    this.productParams.pageNumber = 0;
    this.productParams.pageSize = 0;
    this.getProducts();
  }

  reload(): void {
    this.productParams.searchString = '';
    this.productParams.pageNumber = 0;
    this.productParams.pageSize = 0;
    this.getProducts();
  }

}
