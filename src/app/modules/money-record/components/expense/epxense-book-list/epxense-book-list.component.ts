import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ExpenseBookAddComponent } from '../expense-book-add/expense-book-add.component';
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

  showAddExpenseBook = false;
  constructor(private _bottomSheet: MatBottomSheet) { }


  ngOnInit() {

  }

  openAddBook() {
    this.showAddExpenseBook = !this.showAddExpenseBook;
    // this._bottomSheet.open(ExpenseBookAddComponent);
  }

  addBook(value){
    console.log(value);
  }

}
