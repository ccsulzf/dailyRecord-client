import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Injectable()
export class ChartCompareService {
  prevExpenseData;
  nextExpenseData;

  prevComposeExpenseData = [];
  nextComposeExpenseData = [];

  expenseBookList = [];

  minPrev;
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
      (`/dashboard/getMonthExpenseCategroyData?startDate=2020-05-01&endDate=2020-05-31`)
      .toPromise();


    this.nextExpenseData = await this.http.get
      (`/dashboard/getMonthExpenseCategroyData?startDate=2020-06-01&endDate=2020-06-30`)
      .toPromise();

    this.hanleExpenseList(this.prevExpenseData, this.prevComposeExpenseData, 'prev');
    this.hanleExpenseList(this.nextExpenseData, this.nextComposeExpenseData, 'next');

    this.expenseBookList = _.uniqBy(this.expenseBookList, 'expenseBookId');

    this.minPrev = _.minBy(this.prevComposeExpenseData, 'amount');
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

    console.log(this.prevComposeExpenseData);
    console.log(this.nextComposeExpenseData);
  }

  // 处理账本和分类的数据
  hanleExpenseList(data, composeData, sign) {
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
              amount: +item.amount,
            }
          ]
        };
        composeData.push(temp);
      }
    }

    if (sign === 'prev') {
      for(let item of composeData){
        item.amount = -item.amount;
        for(let temp of item.expenseCategoryList){
          temp.amount = -temp.amount;
        }
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
          amount: 0,
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
          amount: 0,
          expenseCategoryList: expenseCategoryList
        });
      }
    }
  }
}
