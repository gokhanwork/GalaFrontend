import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StroageTool } from './../../../utilities/stroageTool';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private stroageTool:StroageTool,
    private toast:ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.stroageTool.getAuthFromLocalStorage();
    const currentUser = this.authService.currentUserValue;
    if (token) {
    if (this.jwtHelper.isTokenExpired(token.token)) {
      this.toast.info("Oturumunuzun süresi doldu","Uyarı!")
    }else{
      if (currentUser) {
        return true;
      }
    }
  }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
