import { Result } from './../../../models/Result';
import { HttpClient } from '@angular/common/http';
import { UnitTypeModel } from './../../models/general/unitTypeModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_URL = `${environment.apiUrl}v1/general`;

@Injectable({
  providedIn: 'root'
})
export class GeneralHttpService {

  constructor(private httpClient:HttpClient) { }

  getUnitTypes() : Observable<Result<UnitTypeModel[]>>{
    return this.httpClient.get<Result<UnitTypeModel[]>>(API_URL + "/units");
  }
}
