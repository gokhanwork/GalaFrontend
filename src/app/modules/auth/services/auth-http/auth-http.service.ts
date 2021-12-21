import { TokenModel } from './../../../../models/tokenModel';
import { Result } from './../../../../models/Result';
import { ListResponseModel } from './../../../../models/listResponseModel';
import { SingleResponseModel } from './../../../singleResponse.model';
import { LoginModel } from './../../models/login.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { UserType } from '../auth.service';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  public login(loginModel:LoginModel) : Observable<any> {
    const headerDict = {
      "tenant": "root"
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(`${API_USERS_URL}tokens`, loginModel,requestOptions);
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<Result<UserModel>> {
    return this.http.get<Result<UserModel>>(`${environment.apiUrl}identity/profile`);
  }
}
