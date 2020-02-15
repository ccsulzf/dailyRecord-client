import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  date = '2019-12-01';
  constructor(
    private fb: FormBuilder
  ) { }

  currenExpenseBook;

  expenseForm = this.fb.group({
    date: [new Date()],
    address: [''],
    category: [''],
    store: [''],
    content: [''],
    payChannel: [''],
    money: [''],
    person: [[]],
    label: [[]],
    memo: ['']
  });


  ngOnInit() {
  }

  onSubmit() {
    console.log(this.expenseForm);
  }

  onSelectBook(item){
    this.currenExpenseBook = item;
  }
}
