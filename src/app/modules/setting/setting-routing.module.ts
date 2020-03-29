import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { BaseDataComponent } from './base-data/base-data.component';
const routes: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
                path: '',
                redirectTo: '/baseData',
                pathMatch: 'full'
              },
            { path: 'baseData', component: BaseDataComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingRoutingModule { }
