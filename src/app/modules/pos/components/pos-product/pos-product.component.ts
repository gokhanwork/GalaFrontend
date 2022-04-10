import { ProductDTO } from './../../models/productDTO';
import { PosService } from './../../services/pos.service';
import { GeneralService } from './../../../../core/services/general.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CategoryDTO } from '../../models/categoryDTO';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pos-product',
  templateUrl: './pos-product.component.html',
  styleUrls: ['./pos-product.component.scss']
})
export class PosProductComponent implements OnInit {
  parentCategories:CategoryDTO[];
  childCategories:CategoryDTO[];
  mainCategories:CategoryDTO[];
  products:ProductDTO[];
  productsByCategory:ProductDTO[];
  isLoading$:Observable<boolean>;
  isShowProduct:boolean = false;
  private unSubscription: Subscription[] = [];
  constructor(private generalService:GeneralService,
              private posService:PosService) {
    this.isLoading$ = generalService.isLoading$;
   }

  ngOnInit(): void {
    this.categoryLoad();
    this.productLoad();
  }
  categoryLoad(){
    const categoriesSubs = this.generalService.getCategories()
          .pipe(first())
          .subscribe((response) => {
            if(response.succeeded){
                this.parentCategories = response.data.filter(a => a.parentCategoryId == '00000000-0000-0000-0000-000000000000');
                this.mainCategories = this.parentCategories;
                this.childCategories = response.data.filter(a => a.parentCategoryId != '00000000-0000-0000-0000-000000000000');
            }
          });
          this.unSubscription.push(categoriesSubs);
  }
  productLoad(){
    const productSubs = this.posService.getPosProduct()
        .pipe(first())
        .subscribe((response) => {
          if(response.succeeded){
              this.products = response.data;
          }
        });
        this.unSubscription.push(productSubs);
  }
  categoryChange(parentCatId:string){
    if(this.childCategories.filter(c => c.parentCategoryId==parentCatId).length>0) {
      this.mainCategories = this.childCategories.filter(c => c.parentCategoryId==parentCatId);
    }else{
      this.isShowProduct = true;
      console.log("Gelen Id ", parentCatId , " :: ");

      this.productsByCategory = this.products.filter(p => p.categoryId == parentCatId || p.subCategoryId == parentCatId);


    }
  }

}
