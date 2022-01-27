import { GeneralHttpService } from './http/general-http.service';
import { UnitTypeModel } from './../models/general/unitTypeModel';
import { Result } from './../../models/Result';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements OnDestroy {
  isLoadingSubject:BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unSubscribe: Subscription[] = [];
  constructor(private generalHttpService:GeneralHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

  getUnitTypes() : Observable<Result<UnitTypeModel[]>>{
    this.isLoadingSubject.next(true);
    return this.generalHttpService.getUnitTypes().pipe(
      map((data: Result<UnitTypeModel[]>) => {
        return data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  ngOnDestroy(): void {
      this.unSubscribe.forEach((sb) => sb.unsubscribe());
  }
}
