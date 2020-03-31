import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

import { BaseDataService } from '../../services';

import * as moment from 'moment';
import * as _ from 'lodash';
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

@Component({
  selector: 'book-manage',
  templateUrl: './book-manage.component.html',
  styleUrls: ['./book-manage.component.scss']
})
export class BookManageComponent implements OnInit {
  dataSource;
  list = [];
  name = '';
  constructor(
    private baseDataService: BaseDataService
  ) { }

  async ngOnInit() {
    this.list = await this.baseDataService.getExpenseBookANDCategory();
    this.dataSource = new ArrayDataSource(this.list);
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = this.list.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.list[i].level === node.level - 1) {
        return this.list[i];
      }
    }
    return null;
  }

  shouldRender(node: ExampleFlatNode) {
    const parent = this.getParentNode(node);
    return !parent || parent.isExpanded;
  }


  update(item, model) {
    item.name = this.name;
    this.baseDataService.updateBaseData(item, model).then((data: any) => {
      item.name = data.name;
      item.isEdit = false;
    });
  }

  hide(item, model) {
    item.isHide = !item.isHide;
    this.baseDataService.updateBaseData(item, model).then((data: any) => {
      data.isEdit = false;
    }, (error) => {
      item.isHide = !item.isHide;
    });
  }

  del(item, model) {
    item.deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    this.baseDataService.updateBaseData(item, model).then((data: any) => {
      _.remove(this.dataSource._data, (temp) => {
        return temp.id === item.id;
      });
      // this.dataSource = new ArrayDataSource(this.list);
    }, (error) => {
      item.deletedAt = null;
    });
  }

  hideExpenseBook(item) {
    // const expenseBook = item;
    const list = this.dataSource._data;
    item.isHide = !item.isHide;
    item.isExpanded = true;
    const originList = [];
    const expenseCategooryList = [];
    for (const temp of list) {
      if (temp.expenseBookId === item.id) {
        originList.push(_.cloneDeep(temp));
        temp.isHide = item.isHide;
        expenseCategooryList.push(temp);
      }
    }

    this.baseDataService.updateORDelExpenseBook(item, expenseCategooryList);

    // fail to reover
    // setTimeout(() => {
    //   item.isHide = !item.isHide;
    //   for (const item of list) {
    //     const find = _.find(originList, (temp) => {
    //       return temp.id === item.id;
    //     });
    //     if (find) {
    //       item.isHide = find.isHide;
    //     }
    //   }
    // }, 5000);
  }

  delExpenseBook(item) {
    const list = this.dataSource._data;
    item.deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const expenseCategooryList = [];
    for (const temp of list) {
      if (temp.expenseBookId === item.id) {
        temp.deletedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        expenseCategooryList.push(temp);
      }
    }
    this.baseDataService.updateORDelExpenseBook(item, expenseCategooryList);

    // fail to recovery
    // setTimeout(() => {
    //   item.deletedAt = null;
    //   for (const temp of list) {
    //     if (temp.expenseBookId === item.id) {
    //       temp.deletedAt = null;
    //     }
    //   }
    // }, 5000);
  }
}
