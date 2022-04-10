import { ProductDTO } from './../models/productDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from 'src/app/core/models/result/Result';
const API_USERS_URL = `${environment.apiUrl}v1/`;

@Injectable({
  providedIn: 'root'
})
export class PosHttpService {

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Result<ProductDTO[]>> {
    return this.httpClient.get<Result<ProductDTO[]>>(`${API_USERS_URL}products/productPos`)
  }
}
