import { Component, Input, OnInit } from '@angular/core';
import { BaseDataService } from '../../services';
@Component({
    selector: 'baseData-manage',
    templateUrl: './baseData-manage.component.html',
    styleUrls: ['./baseData-manage.component.scss']
})
export class BaseDataManageComponent implements OnInit {
    @Input() model;
    list = [];
    constructor(
        private baseDataService: BaseDataService
    ) { }

    ngOnInit() {
        
    }
}
