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
  tables:TableModel[] = [];
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

  /*getTables(){
    this.tableService.getTables().subscribe(response => {
        this.tables = response.data;
        console.log(response.data);
        this.dataLoaded = true;

    },
    (responseError)=> {
        this.toast.error(responseError.error.message,"Hata")
        console.log(responseError);

    })
  }
  /*async getTables() {
    this.tableService.getTables().then((response) => {
      this.tables = response.data;
      this.dataLoaded = true;
      console.log("Metot içi",this.dataLoaded);

    });
  }*/

  /*getTables(){
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.tableService.getTables())
    ).subscribe((response) => {
      this.tables = response.data;
      console.log(this.tables);

    });
  }*/
  getTables(){
    const loginSubscr = this.tableService
      .getTables()
      .pipe(first())
      .subscribe((response) => {
        if (response) {
          console.log(response.data)
          this.tables = response.data;
        } else {
          console.log(response);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  log(text:TableModel[]){
    console.log("DataLoaded",text);

  }

}
