import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatSliderModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule,
  MatInputModule, MatDividerModule, MatIconModule, MatListModule
} from '@angular/material';
import { ShareModule } from './share/share.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CdkTreeModule, CdkTreeNodeDef } from '@angular/cdk/tree';

import { httpInterceptorProviders } from './http-interceptors';
import { MessageService } from './services/message.service';
import { LoginComponent } from './password/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonthCalendarComponent } from './dashboard/month-calendar/month-calendar.component';

import { DashboardService } from './services';
import { MonthCategoryExpenseComponent } from './dashboard/month-category-expense/month-category-expense.component';
import { MonthCategoryIncomeComponent } from './dashboard/month-category-income/month-category-income.component';
import { EqualPWDDirective } from './password/login/equal.directive';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    MonthCalendarComponent,
    MonthCategoryExpenseComponent,
    MonthCategoryIncomeComponent,
    EqualPWDDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSliderModule,
    MatButtonModule,
    ShareModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    CdkTreeModule,
    MatListModule
  ],
  providers: [httpInterceptorProviders, MessageService, CdkTreeNodeDef, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
