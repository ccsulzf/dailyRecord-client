import { Component, HostListener, OnInit, ViewContainerRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private http: HttpClient
  ) { }
  @HostListener('body:keydown', ['$event'])
  /**
   * ArrowDown 40
   * ArrowUp 38
   * ArrowLeft 37
   * ArrowRight 39
   * Tab 9
   * shiftKey true key Tab 9
   */
  hotKeyEvent(e) {

  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.http.get('/user').toPromise().then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      }, (error) => {
      });
    }
  }

  ngAfterViewInit() {

  }
}
