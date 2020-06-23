import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DashboardService } from '../../services';
interface ExampleFlatNode {
  id: number;
  expandable: boolean;
  name: string;
  level: number;
  amount: number;
  isExpanded?: boolean;
}
@Component({
  selector: 'app-month-category-expense',
  templateUrl: './month-category-expense.component.html',
  styleUrls: ['./month-category-expense.component.scss']
})
export class MonthCategoryExpenseComponent implements OnInit {
  isHide = true;
  dataSource;
  list = [];
  type = 'expense';
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(
    private dashboardService: DashboardService
  ) { }

  async ngOnInit() {
    // this.list = await this.dashboardService.getExpenseBookANDCategory();
    this.list = await this.dashboardService.getMonthExpenseCategroyData();
    this.dataSource = new ArrayDataSource(this.list);

  }

  shouldRender(node: ExampleFlatNode) {
    const parent = this.getParentNode(node);
    return !parent || parent.isExpanded;
  }

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = this.list.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.list[i].level === node.level - 1) {
        return this.list[i];
      }
    }
    return null;
  }
}
