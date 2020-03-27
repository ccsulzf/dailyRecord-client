import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
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
      { name: 'Income', path: '/record/income' }
    ]
  }, {
    name: 'Report',
    children: [
      { name: 'Expense Report', path: '/report/expense' },
      { name: 'Income Report', path: '/report/income' },
      { name: 'Money Report' }
    ]
  },
  {
    name: 'Setting',
    children: [
      // { name: 'Person Info' },
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
  currenNodeName = '123';

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
    private router: Router,
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    const find = function (arr: Array<any>, path) {
      arr.forEach(element => {
        if (element.path && (element.path === path)) {
          this.currenNodeName = element.name;
          return;
        } else if (element.children && element.children.length) {
          find(element.children, path);
        }
      });
    }.bind(this);

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        find(TREE_DATA, data.url);
      }
    });
  }

  ngAfterViewInit() {
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  navigateTo(node) {
    if (node.path) {
      this.currenNodeName = node.name;
      this.router.navigateByUrl(node.path);
    }
  }
}
