import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('dr_user'));
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

}
