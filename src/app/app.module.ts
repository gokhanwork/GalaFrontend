import { WidgetsModule } from './_metronic/partials/content/widgets/widgets.module';
import { JwtModule } from '@auth0/angular-jwt';
import { StroageTool } from './utilities/stroageTool';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { TablesComponent } from './pages/tables/tables.component';
import { AddTableComponent } from './pages/tables/add-table/add-table.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StatsWidget5Component } from './_metronic/partials/content/widgets/stats/stats-widget5/stats-widget5.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
// #fake-end#
const authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}
export function tokenGetter() {
  return localStorage.getItem(authLocalStorageToken);
}

@NgModule({
  declarations: [AppComponent, TablesComponent, AddTableComponent, ProductComponent, AddProductComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    WidgetsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    DataTablesModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    StroageTool
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
