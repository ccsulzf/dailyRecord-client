import { Component, ViewEncapsulation } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'tooltip-component',
  template: `
    <mat-list class=“custom-tooltip”>
      <mat-list-item *ngFor="let item of data">
      <mat-icon mat-list-icon>person</mat-icon>
      <div mat-line>{{item.name}}</div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `
      :host {
        position: absolute;
        width: 150px;
        height: 70px;
        /* border: 1px solid cornflowerblue; */
        background: rgba(0,0,0,.03);
        border: 1px solid rgba(0,0,0,.03);
        box-shadow: 0 2px 2px rgba(0,0,0,.24), 0 0 2px rgba(0,0,0,.12);
        overflow-y: auto;
        pointer-events: none;
        transition: opacity 1s;
      }
      .custom-tooltip{
        border: 1px solid rgba(0,0,0,.03);
        box-shadow: 0 2px 2px rgba(0,0,0,.24), 0 0 2px rgba(0,0,0,.12);
      }
      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip p {
        margin: 5px;
        white-space: nowrap;
      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  private params: any;
  private data: any;

  agInit(params): void {
    this.params = params;
    this.data = this.params.value;
  }
}