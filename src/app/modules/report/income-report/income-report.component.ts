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
      { headerName: '日期', field: 'incomeDate' },
      { headerName: '收入', field: 'content', },
      {
        headerName: '金额', field: 'amount',
        cellRenderer: (params) => {
          return params.value ? `+ ${params.value / 100}` : '';
        },
        cellStyle: { color: '#f44336' },
        comparator: function (valueA, valueB) {
          return valueA - valueB;
        }
      },
      {
        headerName: '地点', field: 'address',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: '类别', field: 'incomeCategory',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: '账户', field: 'account',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: '来源', field: 'incomeStore',
        cellRenderer: (params) => {
          return params.value.name;
        },
      },
      {
        headerName: 'Peoples', field: 'people',
        cellRenderer: 'labelPeopleRenderer',
      },
      {
        headerName: '参与人', field: 'label',
        cellRenderer: 'labelPeopleRenderer',
      },
      { headerName: '标签', field: 'memo', tooltipField: 'memo', },
    ];
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
