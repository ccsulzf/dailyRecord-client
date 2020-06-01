import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseDataService } from '../../services';
@Component({
  selector: 'base-data-nav',
  templateUrl: './base-data-nav.component.html',
  styleUrls: ['./base-data-nav.component.scss']
})
export class BaseDataNavComponent implements OnInit {
  @Output() selectBaseData = new EventEmitter<any>();
  currenBaseData = null
  public baseDataModelList = [
    {
      group: '支出',
      list: [
        {
          name: '账本-类别',
          model: 'expenseBook'
        }, {
          name: '收款方',
          model: 'expenseStore'
        }
      ]
    }, {
      group: '收入',
      list: [
        {
          name: '类别',
          model: 'incomeCategory'
        }, {
          name: '来源',
          model: 'incomeStore'
        }
      ]
    }, {
      group: '基础数据',
      list: [
        {
          name: '地点',
          model: 'address'
        }, {
          name: '账户',
          model: 'account'
        }, {
          name: '参与人',
          model: 'people'
        }, {
          name: '标签',
          model: 'label'
        }
      ]
    }
  ];
  constructor(
    private baseDataService: BaseDataService
  ) { }

  select(item) {
    this.currenBaseData = item;
    this.selectBaseData.emit(item);
    this.baseDataService.getBaseData(item.model);
  }

  ngOnInit() {
    this.select({
      name: 'ExpenseBook',
      model: 'expenseBook'
    });
  }

}
