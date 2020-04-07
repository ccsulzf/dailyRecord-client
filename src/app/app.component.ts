import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }
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
    const url = 'http://localhost:3000';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    if (!localStorage.getItem('user')) {
      this.http.get(url + '/user', httpOptions).toPromise().then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      }, (error) => {
      });
    }
  }
}
