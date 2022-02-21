import { Result } from '../../../core/models/result/Result';
import { ResponseModel } from '../../../models/responseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableModel } from '../../../models/tableModel';
import { ListResponseModel } from '../../../models/listResponseModel';


const API_USERS_URL = `${environment.apiUrl}v1/tables`;

@Injectable({
  providedIn: 'root'
})
export class TableHttpService {

  constructor(private httpClient:HttpClient) { }

  addTable(table:TableModel):Observable<Result<TableModel>>{
    return this.httpClient.post<Result<TableModel>>(`${API_USERS_URL}`,table);
  }
  getTables():Observable<Result<TableModel[]>>{
    return this.httpClient.get<Result<TableModel[]>>(`${API_USERS_URL}`);
  }
  /*getTables(): Promise<ListResponseModel<TableModel>> {
    return this.httpClient.get<ListResponseModel<TableModel>>(`${API_USERS_URL}/getAll`).toPromise();
  }*/
}
