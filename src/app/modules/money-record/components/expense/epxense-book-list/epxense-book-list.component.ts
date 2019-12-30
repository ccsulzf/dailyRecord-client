import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-epxense-book-list',
  templateUrl: './epxense-book-list.component.html',
  styleUrls: ['./epxense-book-list.component.scss']
})
export class EpxenseBookListComponent implements OnInit {
  list = [{
    name: 'Test1'
  }, {
    name: 'Test2'
  }, {
    name: 'Test3'
  }, {
    name: 'Test1'
  }, {
    name: 'Test2'
  }, {
    name: 'Test3'
  }, {
    name: 'Test1'
  }, {
    name: 'Test2'
  }, {
    name: 'Test3'
  }];
  constructor() { }

  ngOnInit() {

  }

}
