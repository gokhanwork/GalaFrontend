import { finalize, map } from 'rxjs/operators';
import { ListResponseModel } from './../../../models/listResponseModel';
import { ProductModel } from './../models/productModel';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ListsComponent } from 'src/app/modules/widgets-examples/lists/lists.component';
import { ProductHttpService } from './product-http.service';

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

   getProducts():Observable<ListResponseModel<ProductModel>>{
     this.isLoadingSubject.next(true);
     return this.productHttpService.getProducts().pipe(
       map((data:ListResponseModel<ProductModel>) => {
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
