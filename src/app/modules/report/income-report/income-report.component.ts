import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { filterOption } from './condition';
import { Subscription } from 'rxjs';
import { ReportFilterService, ReportIncomeService } from '../services';
import { CustomTooltip } from '../grid-components/custom-tooltip/custom-tooltip.component';
import { MatDrawer } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.scss']
})
export class IncomeReportComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;

  getFilter: Subscription;
  filterOption = filterOption;

  totalAmount = 0;
  totalCount = 0;

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private frameworkComponents;
  private rowData = [];
  constructor(
    private reportFilterService: ReportFilterService,
    private reportIncomeService: ReportIncomeService
  ) {
    const item = _.find(filterOption, { field: 'incomeDate' });
    this.reportIncomeService.setDefaultDate(this.filterOption);
    this.columnDefs = [
      { headerName: 'Date', field: 'incomeDate' },
      { headerName: 'IncomeContent', field: 'content', },
      {
        headerName: 'Amount', field: 'amount',
        cellRenderer: (params) => {
          return params.value ? `+ ${params.value}` : '';
        },
        cellStyle: { color: '#f44336' },
      },
      {
        headerName: 'Address', field: 'address',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'IncomeCategory', field: 'incomeCategory',
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
        headerName: 'IncomeStore', field: 'incomeStore',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'Peoples', field: 'peoples',
        tooltipField: 'peoples',
      },
      { headerName: 'Labels', field: 'price' },
      { headerName: 'Memo', field: 'memo' },
    ];
    this.frameworkComponents = { customTooltip: CustomTooltip };
  }

  ngOnInit() {
    this.getFilter = this.reportFilterService.getFilter().subscribe((data) => {
      if (this.drawer) {
        this.drawer.close();
      }
      this.reportIncomeService.getList(data).then((value) => {
        this.gridApi.setRowData(value);
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getAllDisplayedColumns());
      });
      this.reportIncomeService.getTotal(data).then((value) => {
        this.totalAmount = value.totalAmount;
        this.totalCount = Number(value.totalCount);
      });
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getAllDisplayedColumns());
    try {
      (params.api as any).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 0;
    } catch (e) {
      console.error(e);
    }
  }

  ngOnDestroy() {
    this.getFilter.unsubscribe();
  }


}
