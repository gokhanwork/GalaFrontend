import { Category } from './../../../../models/category';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormControl, FormGroup, ControlContainer } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GeneralService } from './../../../services/general.service';
import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorySelectDTO } from 'src/app/core/models/general/categorySelectDTO';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategorySelectComponent implements OnInit, OnDestroy {

  categories:CategorySelectDTO[];
  responseCategories:CategorySelectDTO[];
  selectedCategories:CategorySelectDTO[] = [];
  form:FormGroup;
  categoryFormControl:FormControl;
  subCategoryFormControl:FormControl;
  isLoading$:Observable<boolean>
  private unSubscription:Subscription[] = [];



  @Input() categorySelectName:string;
  @Input() categoryControlName:string;
  @Input() subCategorySelectName:string;
  @Input() subCategoryControlName:string;
  @Input() divClass:string;

  constructor(private generalService:GeneralService,
              private controlContainer:ControlContainer) {
                this.isLoading$ = generalService.isLoading$;
               }

  ngOnInit(): void {
    this.getCategories();
    this.form = <FormGroup>this.controlContainer.control;
    this.categoryFormControl = <FormControl>this.form.get(this.categoryControlName);
    this.subCategoryFormControl = <FormControl>this.form.get(this.subCategoryControlName);
  }
  ngOnDestroy(): void {
  }
  getCategories(){
    const categoriesSubs = this.generalService.getCategories()
          .pipe(first())
          .subscribe((response) => {
            if(response.succeeded){
                this.categories = response.data;
                this.responseCategories = response.data.filter(
                  c => c.parentCategoryId == "00000000-0000-0000-0000-000000000000"
                )

            }
          });
          this.unSubscription.push(categoriesSubs);
  }
  onChange(newValue:string) {
    if(Array.isArray(this.categories)){
      if(this.categories.length > 0)
        {
          this.selectedCategories = this.categories.filter(a => a.parentCategoryId == newValue)
        }
    }
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
