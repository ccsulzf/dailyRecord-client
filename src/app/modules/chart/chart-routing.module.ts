import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartFlowComponent } from './chart-flow/chart-flow.component';
import { ChartCompareComponent } from './chart-compare/chart-compare.component';
const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
    children: [
      {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
      },
      { path: 'list', component: ChartListComponent },
      { path: 'flow', component: ChartFlowComponent },
      { path: 'compare', component: ChartCompareComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
