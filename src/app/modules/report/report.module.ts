import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    RouterModule
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
