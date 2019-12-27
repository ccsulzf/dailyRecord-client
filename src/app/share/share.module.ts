import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { TopComponent } from './components/top/top.component';

@NgModule({
  declarations: [NavComponent, TopComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavComponent,
    TopComponent
  ]
})
export class ShareModule { }
