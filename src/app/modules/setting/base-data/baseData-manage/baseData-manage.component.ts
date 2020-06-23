import { Component, Input, OnInit } from '@angular/core';
import { BaseDataService } from '../../services';
import * as moment from 'moment';
@Component({
    selector: 'baseData-manage',
    templateUrl: './baseData-manage.component.html',
    styleUrls: ['./baseData-manage.component.scss']
})
export class BaseDataManageComponent implements OnInit {
    @Input() model;
    list = [];
    name = '';

    constructor(
        public baseDataService: BaseDataService,
    ) { }

    ngOnInit() {

    }

    update(item) {
        item.name = this.name;
        this.baseDataService.updateBaseData(item, this.model).then((data: any) => {
            data.isEdit = false;
        });
    }

    hide(item) {
        item.isHide = !item.isHide;
        this.baseDataService.updateBaseData(item, this.model).then((data: any) => {
            data.isEdit = false;
        }, (error) => {
            item.isHide = !item.isHide;
        });

    }

    del(item, index) {
        item.deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');

        this.baseDataService.updateBaseData(item, this.model).then((data: any) => {
            this.baseDataService.baseDataList.splice(index, 1);
        }, (error) => {
            item.deletedAt = null;
        });
    }
}
