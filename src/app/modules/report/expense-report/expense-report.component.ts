import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { filterOption } from './condition';
import { ReportFilterService, ReportExpenseService } from '../services';
import { Subscription } from 'rxjs';
import { CustomTooltip, LabelPeopleRenderer } from '../grid-components';
import { MatDrawer } from '@angular/material';
import * as  _ from 'lodash';
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

  totalAmount = 0;
  totalCount = 0;

  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public frameworkComponents;
  public rowData = [];

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
  }

  ngOnInit() {
    this.getFilter = this.reportFilterService.getFilter().subscribe((data) => {
      if (this.drawer) {
        this.drawer.close();
      }
      this.init();
      this.reportExpenseService.getList(data).then((value) => {
        this.gridApi.setRowData(value);
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getAllDisplayedColumns());
      });
      this.reportExpenseService.getTotal(data).then((value) => {

        this.totalAmount = value.totalAmount;
        this.totalCount = Number(value.totalCount);
      });
    });
  }

  init() {
    this.totalAmount = 0;
    this.totalCount = 0;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getAllDisplayedColumns());
   
    try {
      //用来设置tooltipShowDelay
      //在组件中没有用 [tooltipShowDelay]="tooltipShowDelay"
      (params.api as any).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 0;
    } catch (e) {
      console.error(e);
    }
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.getFilter.unsubscribe();
  }

}
