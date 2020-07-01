import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule
} from '@angular/material';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartFlowComponent } from './chart-flow/chart-flow.component';

import { ChartFlaowService } from './services';
import { ChartCompareComponent } from './chart-compare/chart-compare.component';
import { ChartHeaderComponent } from './chart-header/chart-header.component';

const MATERIAL_MODULE = [MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [ChartComponent, ChartListComponent, ChartFlowComponent, ChartCompareComponent, ChartHeaderComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ...MATERIAL_MODULE
  ],
  providers: [
    ChartFlaowService
  ]
})
export class ChartModule { }
