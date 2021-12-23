import { LoginModel } from './../../models/login.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { first, filter } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { TenantDialogComponent } from 'src/app/_metronic/partials/content/dialog/tenant-dialog/tenant-dialog.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@root.com',
    password: '123Pa$$word!',
  };
  tenant: string;
  date: Date;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isSelectTenant$: Observable<boolean>;
  isSelectTenantSubject: BehaviorSubject<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService,
    private dialog: MatDialog,
    private cookieService: CookieService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.isSelectTenantSubject = new BehaviorSubject<boolean>(false);
    this.isSelectTenant$ = this.isSelectTenantSubject.asObservable();
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.checkTenant();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TenantDialogComponent, {
      width: '400px',
      data: {tenant: this.tenant},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.date = new Date();
        this.date.setDate( this.date.getDate() + 999 );
        this.tenant = result;
        this.cookieService.set("tenant",result,this.date,"/");
        this.isSelectTenantSubject.next(true)
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  checkTenant(){
    this.tenant = this.cookieService.get("tenant");
    console.log("Check Tenant", this.tenant);
    if(this.tenant){
      this.isSelectTenantSubject.next(true);
      console.log("Check Tenant true");
    }else{
      this.isSelectTenantSubject.next(false);
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    let loginModel:LoginModel = Object.assign({}, this.loginForm.value);
    const loginSubscr = this.authService
      .login(loginModel)
      .pipe(filter(result => result?.succeeded === true))
      .subscribe((response) => {
        if (response) {
          console.log(response)
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
          console.log(response);
          this.toastrService.error("Hata","response")
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

