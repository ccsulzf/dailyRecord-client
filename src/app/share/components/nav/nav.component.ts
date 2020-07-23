import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaseDataService } from '../../../services/base.data.service';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedBackComponent } from './feedBack/feedBack.component';
interface FoodNode {
  name: string;
  path?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: '首页',
    path: '/dashboard'
  }, {
    name: '收支',
    children: [
      { name: '支出', path: '/record/expense' },
      { name: '收入', path: '/record/income' }
    ]
  }, {
    name: '报表',
    children: [
      { name: '支出报表', path: '/report/expense' },
      { name: '收入报表', path: '/report/income' },
      { name: '收支图表', path: '/chart/list' },
    ]
  },
  {
    name: '设置',
    children: [
      { name: '基础数据', path: '/setting/baseData' }
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
    private baseDataService: BaseDataService,
    public dialog: MatDialog
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    const find = function (arr: Array<any>, path) {
      arr.forEach(element => {
        if (element.path && (this.isPath(path, element.path))) {
          this.currenNodeName = element.name;
          return;
        } else if (element.children && element.children.length) {
          find(element.children, path);
        }
      });
    }.bind(this);

    find(TREE_DATA, this.router.url);
  }

  isPath(url, path) {
    if (url === path) {
      return true;
    } else {
      // 对chart做特殊处理
      const urlList = url.split('/');
      const pathList = path.split('/');
      if ((urlList[1] === pathList[1]) && (pathList[1] === 'chart')) {
        return true;
      }
    }
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


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userInfo');
    this.baseDataService.baseData = {};
    this.router.navigateByUrl('/login');
  }

  openFeedbackDialog(): void {
    const dialogRef = this.dialog.open(FeedBackComponent, {
      width: '400px',
    });

  }

}
