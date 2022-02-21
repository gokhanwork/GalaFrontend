import { finalize, map } from 'rxjs/operators';
import { ListResponseModel } from './../../../models/listResponseModel';
import { ProductModel } from './../models/productModel';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ListsComponent } from 'src/app/modules/widgets-examples/lists/lists.component';
import { ProductHttpService } from './product-http.service';
import { ProductParams } from '../models/productParams';
import { HttpParams } from '@angular/common/http';
import { PaginatedResult } from 'src/app/core/models/result/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;


  private unsubscribe: Subscription[] = [];
  constructor(private productHttpService:ProductHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   getProducts(productParams: ProductParams):Observable<PaginatedResult<ProductModel>>{
     this.isLoadingSubject.next(true);
     let params = new HttpParams();
    if (productParams.searchString) {
      params = params.append('searchString', productParams.searchString);
    }
    if (productParams.pageNumber) {
      params = params.append('pageNumber', productParams.pageNumber.toString());
    }
    if (productParams.pageSize) {
      params = params.append('pageSize', productParams.pageSize.toString());
    }
    if (productParams.orderBy) {
      params = params.append('orderBy', productParams.orderBy.toString());
    }
     return this.productHttpService.getProducts(params).pipe(
       map((data: PaginatedResult<ProductModel>) => {
          return data;
       }),
       finalize(() => {
         this.isLoadingSubject.next(false);
       })
     )
   }
   ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
