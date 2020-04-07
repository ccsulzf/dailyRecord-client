import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { filterOption } from './condition';
import { ReportFilterService, ReportExpenseService } from '../services';
import { Subscription, Observable } from 'rxjs';
import { CustomTooltip, LabelPeopleRenderer } from '../grid-components';
import { MatDrawer } from '@angular/material';
import * as  _ from 'lodash';
import { GridOptions } from 'ag-grid-community';
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
    private reportExpenseService: ReportExpenseService
  ) {
    const item = _.find(filterOption, { field: 'expenseDate' });
    this.reportExpenseService.setDefaultDate(item);

    this.columnDefs = [
      { headerName: 'Date', field: 'expenseDate' },
      { headerName: 'ExpenseContent', field: 'content', },
      {
        headerName: 'Amount', field: 'amount',
        cellRenderer: (params) => {
          return params.value ? `- ${params.value}` : '';
        },
        cellStyle: { color: '#673ab7' },
      },
      {
        headerName: 'Address', field: 'address',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'ExpenseBook', field: 'expenseBook',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'ExpenseCategory', field: 'expenseCategory',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'Account', field: 'account',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'ExpenseStore', field: 'expenseStore',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'Peoples', field: 'peoples',
        cellRenderer: 'labelPeopleRenderer',
      },
      {
        headerName: 'Labels', field: 'labels',
        cellRenderer: 'labelPeopleRenderer',
      },
      { headerName: 'Memo', field: 'memo' },
    ];

    this.defaultColDef = {
      editable: false,
      sortable: false,
      filter: false,
      resizable: true,
      tooltipComponent: 'customTooltip',
    };

    this.frameworkComponents = {
      customTooltip: CustomTooltip,
      labelPeopleRenderer: LabelPeopleRenderer
    };

    this.overlayLoadingTemplate =
      `<div>
        <img style="height:160px" src="../../../../assets/images/loading.svg">
        <p>Please wait while your rows are loading</p>
      </div>
    `;

    this.overlayNoRowsTemplate =
      `<div>
        <img style="height:160px" src="../../../../assets/images/empty.svg">
        <p>No Expense Rows</p>
      </div>
      `;

    this.gridoptions = {
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      frameworkComponents: this.frameworkComponents,
      overlayLoadingTemplate: this.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.overlayNoRowsTemplate,
      rowData: []
    };
  }

  ngOnInit() {
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
    this.getFilter.unsubscribe();
  }

}
