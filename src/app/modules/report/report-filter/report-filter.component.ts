import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ReportFilterService } from '../services';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit, AfterViewInit {
  @Input() filterOption;

  constructor(
    private reportFilterService: ReportFilterService
  ) { }

  ngOnInit() {

  }

  search() {
    this.reportFilterService.updateFilterCondition(this.filterOption);
  }

  ngAfterViewInit() {
    this.search();
  }

}
