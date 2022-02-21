import { TokenModel } from './../../../../models/tokenModel';
import { Result } from '../../../../core/models/result/Result';
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
import { CookieService } from 'ngx-cookie-service';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient,
    private cookieService:CookieService) {}

  // public methods
  public login(loginModel:LoginModel) : Observable<any> {
    const tenant = this.cookieService.get("tenant");
    const headerDict = {
      "tenant": tenant
    }
    console.log("Tenant",tenant);

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
