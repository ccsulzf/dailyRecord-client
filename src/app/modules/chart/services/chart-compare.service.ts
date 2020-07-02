import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Injectable()
export class ChartCompareService {
  private user = JSON.parse(localStorage.getItem('dr_user'));
  prevExpenseData;
  nextExpenseData;

  prevComposeExpenseData = [];
  nextComposeExpenseData = [];

  expenseBookList = [];

  maxPrev;
  maxNext;
  constructor(
    public http: HttpClient
  ) { }

  async getData() {
    // this.nextData = await this.http.get('/chart/flow?userId=1&startDate=2020-06-01&endDate=2020-06-30').toPromise();

    this.prevExpenseData = [];
    this.nextExpenseData = [];
    this.prevComposeExpenseData = [];
    this.nextComposeExpenseData = [];
    this.expenseBookList = [];

    this.prevExpenseData = await this.http.get
      (`/dashboard/getMonthExpenseCategroyData?userId=${this.user.id}&startDate=2020-05-01&endDate=2020-05-31`)
      .toPromise();


    this.nextExpenseData = await this.http.get
      (`/dashboard/getMonthExpenseCategroyData?userId=${this.user.id}&startDate=2020-06-01&endDate=2020-06-30`)
      .toPromise();

    this.hanleExpenseList(this.prevExpenseData, this.prevComposeExpenseData);
    this.hanleExpenseList(this.nextExpenseData, this.nextComposeExpenseData);

    this.expenseBookList = _.uniqBy(this.expenseBookList, 'expenseBookId');

    this.maxPrev = _.maxBy(this.prevComposeExpenseData, 'amount');
    this.maxNext = _.maxBy(this.nextComposeExpenseData, 'amount');

    this.supplyExpenseData();

    const tempPrevList = [];
    const tempNextList = [];

    for (let item of this.expenseBookList) {
      const find = _.find(this.prevComposeExpenseData, temp => temp.expenseBookId === item.expenseBookId);

      tempPrevList.push(find);
    }

    for (let item of this.expenseBookList) {
      const find = _.find(this.nextComposeExpenseData, temp => temp.expenseBookId === item.expenseBookId);
      tempNextList.push(find);
    }

    this.prevComposeExpenseData = tempPrevList;
    this.nextComposeExpenseData = tempNextList;
  }

  // 处理账本和分类的数据
  hanleExpenseList(data, composeData) {
    for (let item of data) {
      this.expenseBookList.push({
        expenseBookId: item.expenseBookId,
        expenseBookName: item.expenseBookName
      });
      const hasExpenseBook = _.find(composeData, temp => temp.expenseBookId === item.expenseBookId);
      if (hasExpenseBook) {
        hasExpenseBook.amount += (+item.amount);
        hasExpenseBook.expenseCategoryList.push({
          expenseCategoryId: item.expenseCategoryId,
          expenseCategoryName: item.expenseCategoryName,
          amount: +item.amount
        });
      } else {
        const temp = {
          expenseBookId: item.expenseBookId,
          expenseBookName: item.expenseBookName,
          amount: +item.amount,
          expenseCategoryList: [
            {
              expenseCategoryId: item.expenseCategoryId,
              expenseCategoryName: item.expenseCategoryName,
              amount: +item.amount
            }
          ]
        };
        composeData.push(temp);
      }
    }
  }

  // 补充没有的账本
  supplyExpenseData() {
    for (let item of this.expenseBookList) {
      const hasPrev = _.find(this.prevComposeExpenseData, temp => item.expenseBookId === temp.expenseBookId);

      const hasNext = _.find(this.nextComposeExpenseData, temp => item.expenseBookId === temp.expenseBookId);

      if (!hasPrev && hasNext) {
        const expenseCategoryList = hasNext.expenseCategoryList;
        for (let item of expenseCategoryList) {
          item.amount = 0;
        }
        this.prevComposeExpenseData.push({
          expenseBookId: item.expenseBookId,
          expenseBookName: item.expenseBookName,
          anmount: 0,
          expenseCategoryList: expenseCategoryList
        });
      }

      if (!hasNext && hasPrev) {
        const expenseCategoryList = hasPrev.expenseCategoryList;
        for (let item of expenseCategoryList) {
          item.amount = 0;
        }
        this.nextComposeExpenseData.push({
          expenseBookId: item.expenseBookId,
          expenseBookName: item.expenseBookName,
          anmount: 0,
          expenseCategoryList: expenseCategoryList
        });
      }
    }
  }
}
