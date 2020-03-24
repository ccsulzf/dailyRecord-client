import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {
  @Input() filterOption;
  constructor() { }

  ngOnInit() {
    console.log(this.filterOption);
  }


  test() {
    console.log(this.filterOption);
  }
}
