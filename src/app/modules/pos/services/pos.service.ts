import { map, finalize } from 'rxjs/operators';
import { PosHttpService } from './pos-http.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ProductDTO } from '../models/productDTO';
import { Result } from 'src/app/core/models/result/Result';

@Injectable({
  providedIn: 'root'
})
export class PosService implements OnDestroy {

  isLoadingSubject:BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unSubscribe: Subscription[] = [];
  constructor(private posHttpService:PosHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }
   getPosProduct():Observable<Result<ProductDTO[]>>{
      this.isLoadingSubject.next(true)
      return this.posHttpService.getProducts().pipe(
        map((data: Result<ProductDTO[]>) => {
          return data;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
   }
   ngOnDestroy(): void {
    this.unSubscribe.forEach((sb) => sb.unsubscribe());
}
}
