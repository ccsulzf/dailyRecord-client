import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TopComponent } from './components/top/top.component';
import { FeedBackComponent } from './components/nav/feedBack/feedBack.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatTreeModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatDividerModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { CdkTreeModule } from '@angular/cdk/tree';
@NgModule({
  declarations: [NavComponent, TopComponent, FeedBackComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTreeModule,
    CdkTreeModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    NavComponent,
    TopComponent
  ],
  entryComponents: [
    FeedBackComponent
  ]
})
export class ShareModule { }
