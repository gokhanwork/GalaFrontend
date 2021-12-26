import { CategoryModel } from './../models/categoryModel';
import { Result } from './../../../models/Result';
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
}
