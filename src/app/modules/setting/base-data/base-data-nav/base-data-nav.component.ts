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
  private baseDataModelList = [
    {
      group: 'Expense',
      list: [
        {
          name: 'ExpenseBook & Category',
          model: 'expenseBook'
        }, {
          name: 'ExpenseStore',
          model: 'expenseStore'
        }
      ]
    }, {
      group: 'Income',
      list: [
        {
          name: 'IncomeCategory',
          model: 'incomeCategory'
        }, {
          name: 'IncomeStore',
          model: 'incomeStore'
        }
      ]
    }, {
      group: 'Base Data',
      list: [
        {
          name: 'Address',
          model: 'address'
        }, {
          name: 'Account',
          model: 'account'
        }, {
          name: 'Peoples',
          model: 'people'
        }, {
          name: 'Labels',
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
