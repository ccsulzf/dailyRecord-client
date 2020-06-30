import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, zip, combineLatest, race, AsyncSubject } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
@Injectable()
export class ChartFlaowService {
    // nodes的category有三种 account income expense
    public nodes = [];
    public links = [];
    constructor(
        public http: HttpClient
    ) { }

    getData() {
        this.nodes = [];
        this.links = [];
        return this.http.get('/chart/flow?userId=1&startDate=2020-06-01&endDate=2020-06-30').toPromise();
    }


    // _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
    handleIncome(incomeList) {
        const nodes = [];
        const links = [];
        for (let item of incomeList) {
            nodes.push({
                category: 'income',
                name: item.incomeCategoryName
            });
            nodes.push({
                category: 'account',
                name: item.accountName
            });

            links.push({
                source: item.incomeCategoryName,
                target: item.accountName,
                value: item.amount / 100
            });
        }

        this.nodes = _.unionWith(this.nodes, nodes, _.isEqual);
        this.links = _.concat(this.links, links);
    }

    handleExpense(expenseList) {
        const nodes = [];
        const links = [];
        for (let item of expenseList) {
            nodes.push({
                category: 'expenseBook',
                name: item.expenseBookName
            });

            nodes.push({
                category: 'expenseCategory',
                name: item.expenseCategoryName
            });

            nodes.push({
                category: 'account',
                name: item.accountName
            });

            links.push({
                source: item.expenseBookName,
                target: item.expenseCategoryName,
                value: item.amount / 100
            });

            // 对expenseBook要单独处理，expenseBook要进行累加
            links.push({
                source: item.accountName,
                target: item.expenseBookName,
                value: item.amount / 100
            });
        }
        this.nodes = _.unionWith(this.nodes, nodes, _.isEqual);
        this.links = _.concat(this.links, links);
    }


    getKey(data) {
        const incomeList = _.uniq(_.map(data.income, 'incomeCategoryName'));
        const accountList = _.uniq(_.concat(_.map(data.income, 'accountName'), _.map(data.expense, 'accountName')));
        const expenseBookList = _.uniq(_.map(data.expense, 'expenseBookName'));
        const expenseCategoryList = _.uniq(_.map(data.expense, 'expenseCategoryName'));

        // console.log(_.concat(incomeList, accountList, expenseBookList, expenseCategoryList));
        for (let item of _.concat(incomeList, accountList, expenseBookList, expenseCategoryList)) {
            this.nodes.push({
                name: item
            })
        }

    }
    testIncome(incomeList) {
        const links = [];
        for (let item of incomeList) {
            // income->account
            links.push({
                names: [item.incomeCategoryName, item.accountName],
                source: _.findIndex(this.nodes, temp => temp.name === item.incomeCategoryName),
                target: _.findIndex(this.nodes, temp => temp.name === item.accountName),
                value: item.amount / 100
            })
        }
        this.links = _.concat(this.links, links);
    }
    testExpense(expenseList) {
        const links = [];
        for (let item of expenseList) {
            // account->expenseBook
            links.push({
                names: [item.accountName, item.expenseBookName],
                source: _.findIndex(this.nodes, temp => temp.name === item.accountName),
                target: _.findIndex(this.nodes, temp => temp.name === item.expenseBookName),
                value: item.amount / 100
            });

            // expenseBook->expenseCategory
            links.push({
                names: [item.accountName, item.expenseBookName, item.expenseCategoryName],
                source: _.findIndex(this.nodes, temp => temp.name === item.expenseBookName),
                target: _.findIndex(this.nodes, temp => temp.name === item.expenseCategoryName),
                value: item.amount / 100
            });
        }
        this.links = _.concat(this.links, links);
    }


}