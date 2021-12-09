import { ProductModel } from './../models/productModel';
import { ListResponseModel } from './../../../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}/Product`;


@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<ProductModel>>{
      return this.httpClient.get<ListResponseModel<ProductModel>>(`${API_USERS_URL}/getAll`);
  }
}
