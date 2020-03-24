import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}
