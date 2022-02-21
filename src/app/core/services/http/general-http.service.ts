import { BrandModel } from './../../models/general/brandModel';
import { Result } from '../../models/result/Result';
import { HttpClient } from '@angular/common/http';
import { UnitTypeModel } from './../../models/general/unitTypeModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_URL = `${environment.apiUrl}v1`;

@Injectable({
  providedIn: 'root'
})
export class GeneralHttpService {

  constructor(private httpClient:HttpClient) { }

  // Unit:::start
  getUnitTypes() : Observable<Result<UnitTypeModel[]>>{
    return this.httpClient.get<Result<UnitTypeModel[]>>(API_URL + "/general/units");
  }
  // Unit:::end
  // Brand:::start
  getBrands() : Observable<Result<BrandModel[]>>{
    return this.httpClient.get<Result<BrandModel[]>>(API_URL + "/brands");
  }
  // Brand:::end
}
