import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseDataService } from '../services/baseData.service';

export const LABEL_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LabelSelectComponent),
  multi: true
};

@Component({
  selector: 'app-label-select',
  templateUrl: './label-select.component.html',
  styleUrls: ['./label-select.component.scss'],
  providers: [LABEL_SELECT_ACCESSOR]
})
export class LabelSelectComponent implements OnInit, ControlValueAccessor {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabel: Observable<any[]>;
  selectedLabels: any[] = [];

  allLabels: any[] = [];
  @ViewChild('labelInput', { static: false }) labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private baseDataService: BaseDataService
  ) {
    this.filteredLabel = this.labelCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allLabels.slice()));
  }


  ngOnInit() {
    this.getList();
  }

  getList() {
    const strObj: any = {};
    const user = JSON.parse(localStorage.getItem('user'));
    strObj.userId = user.id;
    strObj.deletedAt = null;
    strObj.isHide = false;
    this.baseDataService.getBaseData('label', JSON.stringify(strObj)).then((data: any) => {
      this.allLabels = data;
      this.filteredLabel = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((value: string | null) => value ? this._filter(value) : this.allLabels.slice()));
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    this.selectedLabels = data;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }


  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedLabels.push({
          id: '',
          name: value.trim()
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.labelCtrl.setValue(null);
    }
    this.propagateChange(this.selectedLabels);
  }

  remove(name): void {
    const index = this.selectedLabels.findIndex(item => item.name === name);

    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    }
    this.propagateChange(this.selectedLabels);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLabels.push(event.option.value);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
    this.propagateChange(this.selectedLabels);
  }

  private _filter(value: string): string[] {
    return this.allLabels.filter(item => item.name.indexOf(value) === 0);
  }

}
