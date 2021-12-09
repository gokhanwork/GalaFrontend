import { TablesComponent } from './../../../../pages/tables/tables.component';
import { AddTableComponent } from './../../../../pages/tables/add-table/add-table.component';
import { routes } from './../../../../app-routing.module';
import { NavigationStart, Router } from '@angular/router';
import { PageInfo, PageInfoService } from './../../core/page-info.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';
  currentUrl:string ="";

  constructor(private layout: LayoutService,private router:Router) {

  }

  ngOnInit(): void {


    this.toolbarContainerCssClasses =
      this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }

  ngAfterViewInit() {

    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }
  returnCurrentUrl(){

    return this.router.url + "/add"
  }
  checkButtonVisible(){
   if(this.router.url.includes("add") ||
      this.router.url.includes("dashboard")  ){
     return true
   }
   return false

  }
}
