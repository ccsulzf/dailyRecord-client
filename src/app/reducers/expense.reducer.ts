import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';

interface State {
    selectedExpenseBook: object,
    selectedExpenseDetail: object
}

export const expenState: State = {
    selectedExpenseBook: null,
    selectedExpenseDetail: null
};

const expenseBookReducer = createReducer(
    expenState,
    on(ExpenseActions.selectExpenseBook, (state, value) => {
        return { ...state, selectedExpenseBook: value };
    }),
    on(ExpenseActions.selectExpenseDetail, (state, value) => {
        return { ...state, selectedExpenseDetail: value }
    })
)

const expenseState = createFeatureSelector<State>('expense');

const selectExpenseBook = (state: State) => state.selectedExpenseBook;

const selectExpenseDetail =  (state: State) => state.selectedExpenseDetail;

export const getSelectedExpenseBook = createSelector(expenseState, selectExpenseBook);

export const getExpenseDetail =  createSelector(expenseState, selectExpenseDetail);

export function expenseReducer(state: State, action: Action) {
    return expenseBookReducer(state, action);
}
