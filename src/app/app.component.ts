import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
    // console.log(e);
    // switch (e.keyCode) {

    // }
  }
}
