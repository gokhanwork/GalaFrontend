import { Result } from './../../models/Result';
import { TableHttpService } from './services/table-http.service';
import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Toast } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableModel } from 'src/app/models/tableModel';
import { Observable, Subscription, timer } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  tables:TableModel[];
  private unsubscribe: Subscription[] = [];
  dataLoaded = false;
  isLoading$: Observable<boolean>;


  constructor(private tableService:TableService,
    private toast:ToastrService) {
      this.isLoading$ = this.tableService.isLoading$;
     }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(){
    const tableSubcr = this.tableService
      .getTables()
      .pipe(first())
      .subscribe((response) => {
        if (response.succeeded) {
          console.log(response.data)
          this.tables = response.data;
        } else {
          console.log(response);
        }
      });
    this.unsubscribe.push(tableSubcr);
  }

}
