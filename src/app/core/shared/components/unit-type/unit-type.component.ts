import { first } from 'rxjs/operators';
import { UnitTypeModel } from './../../../models/general/unitTypeModel';
import { GeneralService } from './../../../services/general.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.scss']
})
export class UnitTypeComponent implements OnInit {
  unitTypes: UnitTypeModel[];
  @Input() name:string;
  isLoading$:Observable<boolean>;

  private unSubscripe:Subscription[] = [];

  constructor(private generalService:GeneralService) {
    this.isLoading$ = generalService.isLoading$;
   }

  ngOnInit(): void {
    this.getUnitType();
  }
  getUnitType(){
    const unitSubcr = this.generalService.getUnitTypes()
      .pipe(first())
      .subscribe((response) => {
        if(response.succeeded){
          this.unitTypes = response.data;
          console.log("Units",this.unitTypes);

        }
      });
      this.unSubscripe.push(unitSubcr);
  }
}
