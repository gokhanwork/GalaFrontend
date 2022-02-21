import { ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { BrandModel } from './../../../models/general/brandModel';
import { first } from 'rxjs/operators';
import { GeneralService } from './../../../services/general.service';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-select',
  templateUrl: './brand-select.component.html',
  styleUrls: ['./brand-select.component.scss']
})
export class BrandSelectComponent implements OnInit {

  brands: BrandModel[];
  form: FormGroup;
  formControl:FormControl;
  @Input() name:string;
  @Input() controlName:string;
  isLoading$:Observable<boolean>

  private unSubscription:Subscription[] =[];
  constructor(private generalService:GeneralService,
              private controlContainer:ControlContainer) {
    this.isLoading$ = generalService.isLoading$;
   }
  ngOnInit(): void {
    this.getBrands();
    this.form = <FormGroup>this.controlContainer.control;
    this.formControl = <FormControl>this.form.get(this.controlName);
  }
  getBrands(){
    const brandSubs = this.generalService.getBrands()
      .pipe(first())
      .subscribe((response) => {
        if(response.succeeded){
          this.brands = response.data;
        }
      });
      this.unSubscription.push(brandSubs);
  }

}
