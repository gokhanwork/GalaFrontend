import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
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
  public form: FormGroup;
  public control : FormControl;
  @Input() name:string;
  @Input() controlName : string;
  isLoading$:Observable<boolean>;

  private unSubscripe:Subscription[] = [];

  constructor(private generalService:GeneralService,
              private controlContainer:ControlContainer) {
    this.isLoading$ = generalService.isLoading$;
   }

  ngOnInit(): void {
    this.getUnitType();
    this.form = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.form.get(this.controlName);
  }
  getUnitType(){
    const unitSubcr = this.generalService.getUnitTypes()
      .pipe(first())
      .subscribe((response) => {
        if(response.succeeded){
          this.unitTypes = response.data;

        }
      });
      this.unSubscripe.push(unitSubcr);
  }
}
