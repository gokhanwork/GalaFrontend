import { ProductModel } from './../models/productModel';
import { ListResponseModel } from './../../../models/listResponseModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/app/models/PaginatedResult';

const API_USERS_URL = `${environment.apiUrl}v1/products`;


@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  constructor(private httpClient:HttpClient) { }

  getProducts(params: HttpParams):Observable<PaginatedResult<ProductModel>>{
      return this.httpClient.post<PaginatedResult<ProductModel>>(`${API_USERS_URL}/search`,{params: params});
  }
}
