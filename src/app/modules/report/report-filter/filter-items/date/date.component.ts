import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() item;
  startDate;
  endDate;
  constructor() { }

  ngOnInit() {
    console.log(this.item);
  }

}
