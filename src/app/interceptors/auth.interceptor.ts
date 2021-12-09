import { StroageTool } from './../utilities/stroageTool';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private stroage:StroageTool) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.stroage.getAuthFromLocalStorage();

    let newRequest:HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer "+token?.token)
    })
    return next.handle(newRequest);
  }
}
