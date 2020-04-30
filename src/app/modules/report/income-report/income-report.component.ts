import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { filterOption } from './condition';
import { Subscription } from 'rxjs';
import { ReportFilterService, ReportIncomeService } from '../services';
import { CustomTooltip } from '../grid-components/custom-tooltip/custom-tooltip.component';
import { MatDrawer } from '@angular/material';
import * as _ from 'lodash';
import { LabelPeopleRenderer } from '../grid-components';
import { GridOptions } from 'ag-grid-community';
@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.scss']
})
export class IncomeReportComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;

  getFilter: Subscription;
  filterOption = filterOption;

  totalAmount = 0;
  totalCount = 0;

  gridoptions: GridOptions;

  public columnDefs;
  public defaultColDef;
  public frameworkComponents;
  public rowData = [];

  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;
  constructor(
    private reportFilterService: ReportFilterService,
    private reportIncomeService: ReportIncomeService
  ) {
    const item = _.find(this.filterOption, { field: 'incomeDate' });
    this.reportIncomeService.setDefaultDate(item);
    this.columnDefs = [
      { headerName: 'Date', field: 'incomeDate' },
      { headerName: 'IncomeContent', field: 'content', },
      {
        headerName: 'Amount', field: 'amount',
        cellRenderer: (params) => {
          return params.value ? `+ ${params.value}` : '';
        },
        cellStyle: { color: '#f44336' },
        comparator: function (valueA, valueB) {
          return valueA - valueB;
        }
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
        headerName: 'Account', field: 'account',
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
        cellRenderer: 'labelPeopleRenderer',
      },
      {
        headerName: 'Labels', field: 'labels',
        cellRenderer: 'labelPeopleRenderer',
      },
      { headerName: 'Memo', field: 'memo', tooltipField: 'memo', },
    ];
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
      <p>No Income Rows</p>
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
      this.reportIncomeService.getList(data).then((value) => {
        if (value && value.length) {
          this.gridoptions.api.setRowData(value);
          this.gridoptions.api.sizeColumnsToFit();
          this.gridoptions.columnApi.autoSizeColumns(this.gridoptions.columnApi.getAllDisplayedColumns());
        } else {
          this.gridoptions.api.showNoRowsOverlay();
        }
      });
      this.reportIncomeService.getTotal(data).then((value) => {
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
