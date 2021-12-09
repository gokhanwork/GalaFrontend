import { ResponseModel } from '../../../models/responseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableModel } from '../../../models/tableModel';
import { ListResponseModel } from '../../../models/listResponseModel';


const API_USERS_URL = `${environment.apiUrl}/Table`;

@Injectable({
  providedIn: 'root'
})
export class TableHttpService {

  constructor(private httpClient:HttpClient) { }

  addTable(table:TableModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(`${API_USERS_URL}/add`,table);
  }
  getTables():Observable<ListResponseModel<TableModel>>{
    return this.httpClient.get<ListResponseModel<TableModel>>(`${API_USERS_URL}/getAll`);
  }
  /*getTables(): Promise<ListResponseModel<TableModel>> {
    return this.httpClient.get<ListResponseModel<TableModel>>(`${API_USERS_URL}/getAll`).toPromise();
  }*/
}
