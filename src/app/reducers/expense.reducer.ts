import { Action, createReducer, on } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';
export interface State {
    selectedExpenseBook: object;
}

export const initialState: State = {
    selectedExpenseBook: null
};

const expenseReducer = createReducer(
    initialState,
    on(ExpenseActions.selectExpenseBook, (state) => {
        return { ...state, selectedExpenseBook: state.selectedExpenseBook }
    })
)

export function reducer(state: State | undefined, action: Action) {
    return expenseReducer(state, action);
}
