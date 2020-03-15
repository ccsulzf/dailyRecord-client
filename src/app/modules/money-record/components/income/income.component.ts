import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  date = '2019-12-01';
  constructor(
    private fb: FormBuilder
  ) { }

  incomeForm = this.fb.group({
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
    // console.log(this.incomeForm);
  }

}
