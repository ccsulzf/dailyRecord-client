import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit, AfterViewInit {
  gridOptions: GridOptions;
  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  constructor() {
    this.gridOptions = {
      enableColResize: true,
      enableSorting: true,
      // 隐藏表格左边那个columns
      toolPanelSuppressSideButtons: true,
      columnDefs: this.columnDefs,
      rowData: this.rowData,
    } as GridOptions;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('window:resize')
  private resizeEvent() {
    this.resize();
  }

  private resize() {
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.columnApi.autoSizeColumns(this.gridOptions.columnApi.getAllDisplayedColumns());
  }


}
