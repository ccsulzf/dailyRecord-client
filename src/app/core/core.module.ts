import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {
  MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddressSelectComponent } from './address-select/address-select.component';
import { ItemSelectComponent } from './item-select/item-select.component';
import { MoneyInputComponent } from './money-input/money-input.component';
import { MemoInputComponent } from './memo-input/memo-input.component';
import { ContentInputComponent } from './content-input/content-input.component';
import { LabelSelectComponent } from './label-select/label-select.component';
import { PeopleSelectComponent } from './people-select/people-select.component';
import { ExpenseCategorySelectComponent } from './expenseCatgeory-select';
import { BaseDataService } from './services';
@NgModule({
  declarations: [
    DatePickerComponent,
    AddressSelectComponent,
    ItemSelectComponent, MoneyInputComponent,
    MemoInputComponent, ContentInputComponent,
    LabelSelectComponent,
    PeopleSelectComponent,
    ExpenseCategorySelectComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    DatePickerComponent,
    AddressSelectComponent,
    ItemSelectComponent,
    MoneyInputComponent,
    MemoInputComponent,
    ContentInputComponent,
    PeopleSelectComponent,
    LabelSelectComponent,
    ExpenseCategorySelectComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    BaseDataService
  ]
})
export class CoreModule { }
