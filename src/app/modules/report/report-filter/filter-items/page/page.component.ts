import { Component, OnInit, Input } from '@angular/core';
import { ReportFilterService } from '../../../services';
@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() length;

  pageSize = 100;
  pageSizeOptions = [100, 200, 500, 1000];
  pageIndex = 0;
  pageFilter = {
    skip: 0,
    take: 100
  };
  constructor(
    private reportFilterService: ReportFilterService
  ) { }

  ngOnInit() {
    this.reportFilterService.updateFilterPage(this.pageFilter);
    // this.reportFilterService.getFilterCondition().subscribe(() => {
    //   this.pageIndex = 0;
    //   this.reportFilterService.updateFilterPage({
    //     skip: 0,
    //     take: 100
    //   });
    // })
  }

  select(data) {
    this.pageFilter = {
      skip: data.pageIndex * data.pageSize,
      take: (data.pageIndex + 1) * data.pageSize
    };
    this.reportFilterService.updateFilterPage(this.pageFilter);
  }


}
