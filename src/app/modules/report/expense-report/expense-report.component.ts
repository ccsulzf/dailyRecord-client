import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { filterOption } from './condition';
import { ReportFilterService, ReportExpenseService } from '../services';
import { Subscription, Observable } from 'rxjs';
import { CustomTooltip, LabelPeopleRenderer } from '../grid-components';
import { MatDrawer } from '@angular/material';
import * as  _ from 'lodash';
import { GridOptions } from 'ag-grid-community';
import { BaseDataService } from '../../../services';
@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;
  getFilter: Subscription;
  filterOption = filterOption;

  gridoptions: GridOptions;

  totalAmount = 0;
  totalCount = 0;

  public columnDefs;
  public defaultColDef;
  public frameworkComponents;
  public rowData = [];

  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;

  constructor(
    private reportFilterService: ReportFilterService,
    private reportExpenseService: ReportExpenseService,
    private baseDataService: BaseDataService
  ) {
    const item = _.find(this.filterOption, { field: 'expenseDate' });
    this.reportExpenseService.setDefaultDate(item);

    this.columnDefs = [
      { headerName: '日期', field: 'expenseDate', sortable: true },
      { headerName: '支出', field: 'content', sortable: false },
      {
        headerName: '金额', field: 'amount',
        cellRenderer: (params) => {
          return params.value ? `- ${params.value / 100}` : '';
        },
        cellStyle: { color: '#673ab7' },
        sortable: true,
        comparator: function (valueA, valueB) {
          return valueA - valueB;
        }
      },
      {
        headerName: '地点', field: 'address',
        cellRenderer: (params) => {
          return params.value.name;
        },
        sortable: false
      },
      {
        headerName: '账本', field: 'expenseBook',
        cellRenderer: (params) => {
          return params.value.name;
        },
        sortable: false
      },
      {
        headerName: '类别', field: 'expenseCategory',
        cellRenderer: (params) => {
          return params.value.name;
        },
        sortable: false
      },
      {
        headerName: '账户',
        sortable: false,
        field: 'account',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: '收款方', field: 'expenseStore',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: '参与人', field: 'people',
        cellRenderer: 'labelPeopleRenderer',
      },
      {
        headerName: '标签', field: 'label',
        cellRenderer: 'labelPeopleRenderer',
      },
      {
        headerName: '备注', field: 'memo',
        tooltipField: 'memo',
      },
    ];

    this.defaultColDef = {
      editable: false,
      sortable: true,
      filter: false,
      resizable: true,
    };

    this.frameworkComponents = {
      customTooltip: CustomTooltip,
      labelPeopleRenderer: LabelPeopleRenderer
    };

    this.overlayLoadingTemplate =
      `<div>
        <img style="height:160px" src="../../../../assets/images/loading.svg">
        <p>数据加载中...</p>
      </div>
    `;

    this.overlayNoRowsTemplate =
      `<div>
        <img style="height:160px" src="../../../../assets/images/empty.svg">
        <p>当前查询没有数据</p>
      </div>
      `;

    this.gridoptions = {
      defaultColDef: this.defaultColDef,
      columnDefs: this.columnDefs,
      frameworkComponents: this.frameworkComponents,
      overlayLoadingTemplate: this.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.overlayNoRowsTemplate,
      rowData: []
    };
  }

  ngOnInit() {
    this.baseDataService.clearItemSelected();
    this.getFilter = this.reportFilterService.getFilter().subscribe((data) => {
      if (this.drawer) {
        this.drawer.close();
      }
      this.init();
      this.reportExpenseService.getList(data).then((value) => {
        this.gridoptions.api.hideOverlay();
        if (value && value.length) {
          this.gridoptions.api.setRowData(value);
          this.gridoptions.api.sizeColumnsToFit();
          this.gridoptions.columnApi.autoSizeColumns(this.gridoptions.columnApi.getAllDisplayedColumns());
        } else {
          this.gridoptions.api.showNoRowsOverlay();
        }
      });
      this.reportExpenseService.getTotal(data).then((value) => {
        this.totalAmount = value.totalAmount;
        this.totalCount = Number(value.totalCount);
      });
    });
  }


  ngAfterViewInit() {
    this.gridoptions.api.showLoadingOverlay();
  }

  init() {
    this.totalAmount = 0;
    this.totalCount = 0;
    if (this.gridoptions.api) {
      this.gridoptions.api.setRowData([]);
      this.gridoptions.api.showLoadingOverlay();
    }
  }

  onGridReady(params) {
    try {
      // 用来设置tooltipShowDelay
      // 在组件中没有用 [tooltipShowDelay]="tooltipShowDelay"
      (params.api as any).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 0;
    } catch (e) {
      console.error(e);
    }
  }


  ngOnDestroy() {
    this.reportFilterService.initFilterOption(this.filterOption);
    this.getFilter.unsubscribe();
  }

}
