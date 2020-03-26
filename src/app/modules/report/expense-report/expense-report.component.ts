import { Component, OnInit, ViewEncapsulation, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { filterOption } from './condition';
import { ReportFilterService, ReportExpenseService } from '../services';
import { Subscription } from 'rxjs';
import { CustomTooltip } from '../grid-components/custom-tooltip/custom-tooltip.component';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit, AfterViewInit, OnDestroy {

  getFilter: Subscription;
  filterOption = filterOption;

  totalAmount = 0;
  totalCount = 0;

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private tooltipShowDelay;
  private frameworkComponents;
  private rowData = [];

  constructor(
    private reportFilterService: ReportFilterService,
    private reportExpenseService: ReportExpenseService
  ) {
    this.reportExpenseService.setDefaultDate(this.filterOption);
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
      {
        headerName: 'Peoples', field: 'peoples', tooltipField: 'peoples',
        tooltipComponentParams: { color: '#ececec' },
      },
      { headerName: 'Labels', field: 'price' },
      { headerName: 'Memo', field: 'memo' },
    ];
    this.defaultColDef = {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      tooltipShowDelay: 0,
      tooltipComponent: 'customTooltip',
    };

    this.tooltipShowDelay = 0;
    this.frameworkComponents = { customTooltip: CustomTooltip };
  }

  ngOnInit() {
    this.getFilter = this.reportFilterService.getFilter().subscribe((data) => {
      this.reportExpenseService.getList(data).then((value) => {
        this.gridApi.setRowData(value);
        this.resize();
      });
      this.reportExpenseService.getTotal(data).then((value) => {
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
      //用来设置tooltipShowDelay
      //在组件中没有用 [tooltipShowDelay]="tooltipShowDelay"
      (params.api as any).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 0;
    } catch (e) {
      console.error(e);
    }
  }

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('window:resize')
  public resizeEvent() {
    this.resize();
  }

  public resize() {
    // this.gridApi.sizeColumnsToFit();
    // this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getAllDisplayedColumns());
  }


  ngOnDestroy() {
    this.getFilter.unsubscribe();
  }

}
