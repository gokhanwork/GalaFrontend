import { TranslateService } from '@ngx-translate/core';
import { CategorySelectComponent } from './../../../core/shared/components/category-select/category-select.component';
import { ToastrService } from 'ngx-toastr';
import { ProductHttpService } from './../services/product-http.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit, OnDestroy {
  productAddForm: FormGroup;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading:boolean;
  private unsubcsription: Subscription[]= [];
  constructor(private formBuilder:FormBuilder,
              private productHttpService:ProductHttpService,
              private toastr:ToastrService,
              private translate:TranslateService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
      this.unsubcsription.push(loadingSubscr);
   }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: [''],
      code: ['', Validators.required],
      unitId: ['', Validators.required],
      rate: [1],
      costPrice: [''],
      price: ['',Validators.required],
      brandId: [''],
      categoryId: ['',Validators.required],
      subCategoryId:[''],
      quantity:[],
      alertQuantity:[]
    });
  }

  addProduct(){
    this.isLoading$.next(true);
    let product = Object.assign({}, this.productAddForm.value)
    if(this.productAddForm.valid){
      this.productHttpService.addProducts(product).subscribe((response) => {
        this.isLoading$.next(false);
        this.toastr.success(response.messages[0],"Başarılı")
      },
      (responseError) => {
        this.isLoading$.next(false);
        console.log(responseError)
        this.toastr.error(responseError.error.exception,"hata")
      }
      );
    }else{
      this.isLoading$.next(false);
      this.toastr.error("Eksik alanları doldurun","Hata")
    }
  }
  ngOnDestroy(): void {
      this.unsubcsription.forEach((sb) => sb.unsubscribe());
  }

}
