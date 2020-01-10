import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TopComponent } from './components/top/top.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatTreeModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatDividerModule
} from '@angular/material';
import { CdkTreeModule } from '@angular/cdk/tree';
@NgModule({
  declarations: [NavComponent, TopComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTreeModule,
    CdkTreeModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    NavComponent,
    TopComponent
  ]
})
export class ShareModule { }
