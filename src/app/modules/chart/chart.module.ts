import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule
} from '@angular/material';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartFlowComponent } from './chart-flow/chart-flow.component';

const MATERIAL_MODULE = [MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [ChartComponent, ChartListComponent, ChartFlowComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ...MATERIAL_MODULE
  ]
})
export class ChartModule { }
