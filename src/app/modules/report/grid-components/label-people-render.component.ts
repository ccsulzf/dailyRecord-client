import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as _ from 'lodash';
@Component({
  selector: 'label-people-render',
  template: `
  <div *ngIf="params.value && params.value.length"  matTooltip="{{tooltip}}" matTooltipClass="pre-line">
    <mat-icon>{{field === 'peoples' ? 'people':'label_outline'}}</mat-icon>
    <p>{{value}}</p>
  </div>

  `,
  styles: [
    `
      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      mat-icon{
        margin-right: 5px;
      }
    `,
  ],
})
export class LabelPeopleRenderer implements ICellRendererAngularComp {
  public params: any;
  public value;
  public field;
  public tooltip;
  public headerName;
  agInit(params: any): void {
    this.params = params;
    this.field = params.colDef.field;
    this.headerName = params.colDef.headerName;
    if (this.params.value.length) {
      this.value = this.params.value.length > 1 ? `${this.headerName} * ${this.params.value.length}` : this.params.value[0].name;
    }

    if (this.params.value.length > 1) {
      this.tooltip = _.map(this.params.value, 'name').join('\r\n');
    }

  }


  refresh(): boolean {
    return false;
  }
}