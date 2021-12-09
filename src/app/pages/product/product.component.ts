import { ProductModel } from './models/productModel';
import { first } from 'rxjs/operators';
import { ProductService } from './services/product.service';
import { Component, OnInit, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  products:ProductModel[] = [];
  private unsubscribe: Subscription[] = [];
  dataLoaded = false;
  isLoading$: Observable<boolean>;

  constructor(private renderer: Renderer2, private router: Router,private productService:ProductService,
    toast:ToastrService) {
      this.isLoading$ = this.productService.isLoading$;
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getProducts();

  }
  ngAfterViewInit():void{
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-person-id")) {
        this.router.navigate(["/person/" + event.target.getAttribute("view-person-id")]);
      }
    });
  }
  getProducts(){
    const productSubs = this.productService
    .getProducts()
    .pipe(first())
    .subscribe((response) => {
      if (response) {
        console.log(response.data)
        this.products = response.data;
        this.dtTrigger.next();
      } else {
        console.log(response);
      }
    });
    this.unsubscribe.push(productSubs);

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
