import { CategoryModel } from './models/categoryModel';
import { CategoryService } from './services/category.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  categories:CategoryModel[];
  private unsubscribe: Subscription[] = [];
  dataLoaded = false;
  isLoading$: Observable<boolean>;
  constructor(private renderer: Renderer2, private router: Router,private categoryService:CategoryService) {
    this.isLoading$ = this.categoryService.isLoading$;
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getCategories();
  }

  ngAfterViewInit():void{
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-person-id")) {
        this.router.navigate(["/person/" + event.target.getAttribute("view-person-id")]);
      }
    });
  }

  getCategories(){
    const CategorySubscr = this.categoryService.getCategories()
    .pipe(first())
    .subscribe((response) => {
      if(response.succeeded){

        this.categories = response.data;
        this.dtTrigger.next();

      }
    });
    this.unsubscribe
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
