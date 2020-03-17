import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';

interface State {
    selectedExpenseBook: object;
}

export const expenState: State = {
    selectedExpenseBook: null,
};

const expenseBookReducer = createReducer(
    expenState,
    on(ExpenseActions.selectExpenseBook, (state, value) => {
        return { ...state, selectedExpenseBook: value };
    })
)

const expenseState = createFeatureSelector<State>('expense');

const selectExpenseBook = (state: State) => state.selectedExpenseBook;

export const getSelectedExpenseBook = createSelector(expenseState, selectExpenseBook);

export function expenseReducer(state: State, action: Action) {
    return expenseBookReducer(state, action);
}
