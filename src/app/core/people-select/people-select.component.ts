import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { BaseDataService } from '../services/baseData.service';

export const PEOPLE_SELECT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PeopleSelectComponent),
  multi: true
};

@Component({
  selector: 'app-people-select',
  templateUrl: './people-select.component.html',
  styleUrls: ['./people-select.component.scss'],
  providers: [PEOPLE_SELECT_ACCESSOR]
})
export class PeopleSelectComponent implements OnInit, ControlValueAccessor {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  peopleCtrl = new FormControl();
  filteredPeolple: Observable<any[]>;
  selectedPeoples: any[] = [];

  allPeoples: any[] = [];

  @ViewChild('peopleInput', { static: false }) peopleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private baseDataService:BaseDataService
  ) {
    this.filteredPeolple = this.peopleCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allPeoples.slice()));
  }


  ngOnInit() {
    this.getList()
  }

  getList(){
    const strObj: any = {};
    const user = JSON.parse(localStorage.getItem('user'));
    strObj.userId = user.id;

    this.baseDataService.getBaseData('people', JSON.stringify(strObj)).then((data: any) => {
      this.allPeoples = data;
      this.filteredPeolple = this.peopleCtrl.valueChanges.pipe(
        startWith(null),
        map((value: string | null) => value ? this._filter(value) : this.allPeoples.slice()));
    });
  }

  propagateChange = (temp: any) => { };

  writeValue(data: any): void {
    console.log(data);
    this.selectedPeoples = data;
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
        this.selectedPeoples.push({
          id: '',
          name: value.trim()
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.peopleCtrl.setValue(null);
    }
    this.propagateChange(this.selectedPeoples);
  }

  remove(name): void {
    const index = this.selectedPeoples.findIndex(item => item.name === name);

    if (index >= 0) {
      this.selectedPeoples.splice(index, 1);
    }
    this.propagateChange(this.selectedPeoples);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedPeoples.push(event.option.value);
    this.peopleInput.nativeElement.value = '';
    this.peopleCtrl.setValue(null);
    this.propagateChange(this.selectedPeoples);
  }

  private _filter(value: string): string[] {
    return this.allPeoples.filter(item => item.name.indexOf(value) === 0);
  }


}
