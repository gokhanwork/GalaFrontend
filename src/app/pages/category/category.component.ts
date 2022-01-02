import { CategoryModel } from './models/categoryModel';
import { CategoryService } from './services/category.service';
import { Component, OnInit, Renderer2, OnDestroy, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { CategoryParams } from './models/categoryParams';
import { PaginatedFilter } from 'src/app/core/models/filters/PaginatedFilter';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  categories:CategoryModel[];
  categoryColumns: TableColumn[];
  categoryParams = new CategoryParams();
  private unsubscribe: Subscription[] = [];
  dataLoaded = false;
  isLoading$: Observable<boolean>;
  constructor(private renderer: Renderer2, private router: Router,private categoryService:CategoryService) {
    this.isLoading$ = this.categoryService.isLoading$;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25
    };
    this.getCategories();
  }
  ngAfterViewInit():void{

  }

  getCategories(){
    const categorySubscr = this.categoryService.getCategories()
    .pipe(first())
    .subscribe((response) => {
      if(response.succeeded){

        this.categories = response.data;
        console.log("Kategoriler", this.categories);

        this.dtTrigger.next();

      }
    });
    this.unsubscribe.push(categorySubscr);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
