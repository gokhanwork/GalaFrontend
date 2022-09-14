import { Router } from '@angular/router';
import { CategoryHttpService } from './../services/category-http.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CategoryModel } from '../models/categoryModel';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  categoryAddForm: FormGroup;
  categories:CategoryModel[] = [{
    name: "Seçiniz ...",
    parentCategoryId: "00000000-0000-0000-0000-000000000000",
   id: "00000000-0000-0000-0000-000000000000",
   code:"",
   image:"",
   parentCategoryName:""
  }];
  ngDropdown = this.categories[0];

  constructor(private formBuilder:FormBuilder,
    private categoryHttpService:CategoryHttpService,
    private toastr:ToastrService,
    private router:Router,
    private categoryService:CategoryService
    ) {
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.isLoading$.next(true);
  }

  ngOnInit(): void {

    this.createCategoryAddForm();
    this.getCategories();
  }
  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      parentCategoryId: ['00000000-0000-0000-0000-000000000000']
    });
  }
  addCategory(){
    this.isLoading$.next(true);
    if(this.categoryAddForm.valid){
      let categoryModel = Object.assign({}, this.categoryAddForm.value);
      if(categoryModel.parentCategoryId.length < 1)
      {
        categoryModel.parentCategoryId = '00000000-0000-0000-0000-000000000000';
      }
      console.log("Kategori Model", categoryModel);

      this.categoryHttpService.addCategory(categoryModel).subscribe((response) => {
        this.isLoading$.next(false);
        this.toastr.success(response.messages[0],"Başarılı")
        this.getCategories();

      },
      (responseError) =>{
          this.isLoading$.next(false);
          console.log(responseError);

          this.toastr.error(responseError.error.exception,"Hata");
      });
    } else {
      this.isLoading$.next(false);
      this.toastr.error("Eksik alanları doldurun","Hata");
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  getCategories(){
    const categorySubscr = this.categoryService.getCategories()
    .subscribe((response) => {
      if(response.succeeded){
        this.categories = response.data.filter(c => c.parentCategoryId == '00000000-0000-0000-0000-000000000000');
        this.isLoading$.next(false);
        console.log("Kategori Response", this.categories);
      }
    });
    this.unsubscribe.push(categorySubscr);
  }
}
