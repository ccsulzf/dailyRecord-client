import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {
  MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatChipsModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddressSelectComponent } from './address-select/address-select.component';
import { ItemSelectComponent } from './item-select/item-select.component';
import { MoneyInputComponent } from './money-input/money-input.component';
import { PeopleSelectComponent } from './people-select/people-select.component';
import { MemoInputComponent } from './memo-input/memo-input.component';
@NgModule({
  declarations: [
    DatePickerComponent,
    AddressSelectComponent,
    ItemSelectComponent, MoneyInputComponent, PeopleSelectComponent, MemoInputComponent],
  imports: [
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
    MatChipsModule
  ],
  exports: [
    DatePickerComponent,
    AddressSelectComponent,
    ItemSelectComponent,
    MoneyInputComponent,
    PeopleSelectComponent,
    MemoInputComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
  ]
})
export class CoreModule { }
