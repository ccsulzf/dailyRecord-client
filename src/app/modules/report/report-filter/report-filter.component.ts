import { Component, OnInit, Input } from '@angular/core';
import { ReportFilterService } from '../services';
@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {
  @Input() filterOption;
  constructor(
    private reportFilterService: ReportFilterService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.reportFilterService.updateFilterCondition(this.filterOption);
  }
}
