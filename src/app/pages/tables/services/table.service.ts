import { ListResponseModel } from 'src/app/models/listResponseModel';
import { TableModel } from 'src/app/models/tableModel';
import { TableHttpService } from './table-http.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService implements OnDestroy {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;


  private unsubscribe: Subscription[] = [];
  constructor(private tableHttpService:TableHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

  getTables():Observable<ListResponseModel<TableModel>> {
    this.isLoadingSubject.next(true);
    return this.tableHttpService.getTables().pipe(
      map((data: ListResponseModel<TableModel>) => {
        console.log(data);
        return data;
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
