import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
interface FoodNode {
  name: string;
  path?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Index',
    path: '/dashboard'
  }, {
    name: 'Money Record',
    children: [
      { name: 'Expense', path: '/record/expense' },
      { name: 'Income' }
    ]
  }, {
    name: 'Report',
    children: [
      { name: 'Expense Report' },
      { name: 'Income Report' },
      { name: 'Money Report' }
    ]
  },
  {
    name: 'Setting',
    children: [
      { name: 'Person Info' },
      { name: 'Record Info' }
    ]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  path: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, AfterViewInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: node.path || ''
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private router: Router
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  navigateTo(node) {
    if (node.path) {
      this.router.navigateByUrl(node.path);
    }
  }
}
