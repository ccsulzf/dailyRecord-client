import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';

import { filterOption } from './condition';
import { ReportFilterService, ReportExpenseService } from '../services';
import { Subscription } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit, AfterViewInit, OnDestroy {
  private gridApi;
  private gridColumnApi;

  getFilter: Subscription;
  filterOption = filterOption;
  gridOptions: GridOptions;

  totalAmount = 0;
  totalCount = 0;
  columnDefs = [
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
      headerName: 'PayChannel', field: 'payChannel',
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
    { headerName: 'Peoples', field: 'price' },
    { headerName: 'Labels', field: 'price' },
    { headerName: 'Memo', field: 'memo' },
  ];

  rowData;
  constructor(
    private reportFilterService: ReportFilterService,
    private reportExpenseService: ReportExpenseService
  ) {
    this.reportExpenseService.setDefaultDate(this.filterOption);
    this.gridOptions = {
      enableColResize: true,
      enableSorting: true,
      // 隐藏表格左边那个columns
      toolPanelSuppressSideButtons: true,
      columnDefs: this.columnDefs,
    } as GridOptions;
  }

  ngOnInit() {
    this.getFilter = this.reportFilterService.getFilter().subscribe((data) => {
      this.rowData = this.reportExpenseService.getList(data).then((value) => {
        console.log(value);
        this.gridOptions.api.setRowData(value);
        this.resize();
      });
      this.reportExpenseService.getTotal(data).then((value) => {
        this.totalAmount = value.totalAmount;
        this.totalCount = Number(value.totalCount);
      });
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('window:resize')
  public resizeEvent() {
    this.resize();
  }

  public resize() {
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.columnApi.autoSizeColumns(this.gridOptions.columnApi.getAllDisplayedColumns());
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnDestroy() {
    this.getFilter.unsubscribe();
  }

}
