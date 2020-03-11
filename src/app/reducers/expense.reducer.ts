import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';
export interface State {
    selectedExpenseBook: object;
    // addExpenseBaseData: object
}

export interface ExpenseSate {
    addBaseData: object;
}

export const selectFeature = (state: ExpenseSate) => state.addBaseData;


export const selectExpenseBaseData = createSelector(
    selectFeature,
    (state: ExpenseSate) => state.addBaseData
);


export const initialState: State = {
    selectedExpenseBook: null,
    // addExpenseBaseData: null
};

const _expenseReducer = createReducer(
    initialState,
    on(ExpenseActions.selectExpenseBook, (state, value) => ({ selectedExpenseBook: value }))
)


export function expenseReducer(state: State | undefined, action: Action) {
    return _expenseReducer(state, action);
}
