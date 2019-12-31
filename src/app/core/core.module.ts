import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {
  MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatAutocompleteModule, MatListModule,
  MatButtonModule, MatIconModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddressSelectComponent } from './address-select/address-select.component';
import { ItemSelectComponent } from './item-select/item-select.component';
@NgModule({
  declarations: [DatePickerComponent, AddressSelectComponent, ItemSelectComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    DatePickerComponent,
    AddressSelectComponent,
    ItemSelectComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
  ]
})
export class CoreModule { }
