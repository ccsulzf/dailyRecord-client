import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-data-nav',
  templateUrl: './base-data-nav.component.html',
  styleUrls: ['./base-data-nav.component.scss']
})
export class BaseDataNavComponent implements OnInit {
  private baseDataModelList = [
    {
      group: 'Expense',
      list: [
        {
          name: 'ExpenseBook',
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
          model: 'income'
        }
      ]
    }, {
      group: 'Base Data',
      list: [
        {
          name: 'Address',
          model: 'address'
        }, {
          name: 'PayChannel',
          model: 'payChannel'
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
  constructor() { }

  ngOnInit() {
  }

}
