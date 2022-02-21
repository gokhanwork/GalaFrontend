import { TableModel } from 'src/app/models/tableModel';
import { CategoryModel } from './../models/categoryModel';
import { Result } from '../../../core/models/result/Result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}v1/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<Result<CategoryModel[]>>{
    return this.httpClient.get<Result<CategoryModel[]>>(`${API_USERS_URL}`);
  }
  addCategory(tableModel:TableModel):Observable<Result<CategoryModel>>{
    return this.httpClient.post<Result<CategoryModel>>(`${API_USERS_URL}`,tableModel);
  }
}
