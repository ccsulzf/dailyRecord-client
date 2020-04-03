import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { BaseDataService } from '../services/baseData.service';

import * as _ from 'lodash';

import { Store, select } from '@ngrx/store';
import * as expense from 'src/app/reducers/expense.reducer';
import * as baseData from 'src/app/reducers/baseData.reducer';

export class ExpenseCategorySelectErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export const EXPENSE_CATEGORY_SELECT_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ExpenseCategorySelectComponent),
    multi: true
};

@Component({
    selector: 'expenseCategory-select',
    templateUrl: './expenseCatgeory-select.component.html',
    styleUrls: ['./expenseCatgeory-select.component.scss'],
    providers: [EXPENSE_CATEGORY_SELECT_ACCESSOR]
})

export class ExpenseCategorySelectComponent implements OnInit, ControlValueAccessor {
    @Input() name;
    @Input() model;

    private user = JSON.parse(localStorage.getItem('user'));
    itemSelectControl = new FormControl();

    matcher = new ExpenseCategorySelectErrorStateMatcher();

    expenseBookId = '';

    baseData$: Observable<any>;
    expenseBook$: Observable<any>;
    allExpenseCategoryList = <any>[];
    expenseBookCategoryList = [];

    filterList = [];

    constructor(
        private baseDataService: BaseDataService,
        private store: Store<any>
    ) {
        this.expenseBook$ = store.select(expense.getSelectedExpenseBook);
        this.baseData$ = store.select(baseData.getAddBaseData);
    }

    async ngOnInit() {
        await this.getList();
        this.expenseBook$.subscribe((temp) => {
            this.expenseBookId = temp.id;
            this.filterByExpenseBook();
        });

        this.itemSelectControl.valueChanges.pipe(
            startWith(''),
        ).subscribe((data) => {
            this.filterByInput(data);
        });

        this.baseData$.subscribe((data: Object) => {
            for (let key in data) {
                if (key === this.model) {
                    this.expenseBookCategoryList = [...this.expenseBookCategoryList, data[key]];
                    this.itemSelectControl.setValue(data[key].name);
                    this.propagateChange(data[key]);
                }
            }
        });
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {

    }

    propagateChange = (temp: any) => { };

    writeValue(data: any): void {
        data = data || { id: '', name: '', userId: this.user.id };
        this.itemSelectControl.setValidators(Validators.required);
        this.itemSelectControl.setValue(data.name);
        this.itemSelectControl.markAsPristine();
        this.itemSelectControl.markAsUntouched();
    }

    async getList() {
        const strObj: any = {};
        const user = JSON.parse(localStorage.getItem('user'));
        strObj.userId = user.id;
        strObj.deletedAt = null;
        strObj.isHide = false;
        this.allExpenseCategoryList = await this.baseDataService.getBaseData(this.model, JSON.stringify(strObj));
    }

    filterByExpenseBook() {
        this.expenseBookCategoryList = this.allExpenseCategoryList.filter((item) => {
            return item.expenseBookId === this.expenseBookId;
        });
        if (this.expenseBookCategoryList && this.expenseBookCategoryList.length) {
            const item = this.expenseBookCategoryList[0];
            this.itemSelectControl.setValue(item.name);
            this.propagateChange(item);
        } else {
            this.itemSelectControl.setValue('');
        }
        this.filterList = _.cloneDeep(this.expenseBookCategoryList);
    }

    select(data) {
        const value = data.option.value;
        this.propagateChange(value);
        this.itemSelectControl.setValue(value.name);
    }

    // 如果该值
    filterByInput(value) {
        const findItem = this.expenseBookCategoryList.find((item) => {
            return item.name === value;
        });

        this.filterList = this.expenseBookCategoryList.filter((item) => {
            return item.name.indexOf(value) > -1;
        });
        if (findItem) {
            this.propagateChange(findItem);
        } else {
            this.propagateChange({
                id: '',
                name: (value.name || value),
                userId: this.user.id,
                expenseBookId: this.expenseBookId
            });
        }
    }

}