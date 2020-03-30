import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

import { BaseDataService } from '../../services';
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

}
