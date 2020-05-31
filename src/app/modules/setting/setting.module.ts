import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { BaseDataComponent } from './base-data/base-data.component';
import { BaseDataNavComponent } from './base-data/base-data-nav/base-data-nav.component';

import { MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { BookManageComponent } from './base-data/book-manage/book-manage.component';

import { BaseDataManageComponent } from './base-data/baseData-manage';

import { CdkTreeModule, CdkTreeNodeDef } from '@angular/cdk/tree';

import { BaseDataService } from './services';
@NgModule({
  declarations: [BaseDataComponent, SettingComponent, BaseDataNavComponent, BookManageComponent, BaseDataManageComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CdkTreeModule
  ],
  providers: [
    CdkTreeNodeDef,
    BaseDataService
  ]
})
export class SettingModule { }
