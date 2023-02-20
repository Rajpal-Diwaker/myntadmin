import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./_interceptors/http.interceptor";
import { AuthInterceptor } from "./_interceptors/auth.interceptor";
import { NgxSpinnerModule } from 'ngx-spinner';
import { RequestDetailComponent } from './pages/mynt-professional/request-detail/request-detail.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
import {AccordionModule} from "ngx-accordion";
import { CKEditorModule } from 'ng2-ckeditor';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { environment } from 'environments/environment';
// const socketConfig: SocketIoConfig = { url:'http://13.126.131.184:7788/', options: {} };
const socketConfig: SocketIoConfig = { url:'http://localhost:7788/', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    AccordionModule,
    CKEditorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    ScrollingModule,
    MatBadgeModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'DD-MM-YYYY',
      },
      display: {
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
