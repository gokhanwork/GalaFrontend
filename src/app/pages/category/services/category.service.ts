import { map, finalize } from 'rxjs/operators';
import { CategoryHttpService } from './category-http.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CategoryModel } from '../models/categoryModel';
import { Result } from 'src/app/models/Result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnDestroy {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;


  private unsubscribe: Subscription[] = [];
  constructor(private categoryHttpService:CategoryHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   getCategories(): Observable<Result<CategoryModel[]>>{
     this.isLoadingSubject.next(true);
     return this.categoryHttpService.getCategories().pipe(
       map((data: Result<CategoryModel[]>) => {
         return data;
       }),
       finalize(() => this.isLoadingSubject.next(false)),
     );
   }
   ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
