import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-data',
  templateUrl: './base-data.component.html',
  styleUrls: ['./base-data.component.scss']
})
export class BaseDataComponent implements OnInit {
  currenBasedata;
  constructor() { }

  ngOnInit() {

  }

  onSelectBaseData(value) {
    this.currenBasedata = value;
  }

}
