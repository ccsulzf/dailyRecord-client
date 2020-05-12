import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatSliderModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule,
  MatInputModule, MatDividerModule, MatIconModule
} from '@angular/material';
import { ShareModule } from './share/share.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { expenseReducer, baseDataReducer, incomeReducer } from './reducers';


import { httpInterceptorProviders } from './http-interceptors';
import { MessageService } from './message.service';
import { LoginComponent } from './password/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent
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
    StoreModule.forRoot({ expense: expenseReducer, baseData: baseDataReducer, income: incomeReducer })
  ],
  providers: [httpInterceptorProviders, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
