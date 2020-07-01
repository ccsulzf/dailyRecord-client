import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'chart-header',
  templateUrl: './chart-header.component.html',
  styleUrls: ['./chart-header.component.scss']
})
export class ChartHeaderComponent implements OnInit {
  @Input() title;
  @Output() start = new EventEmitter<any>();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/chart/list');
  }

  onStart() {
    this.start.emit();
  }
}
