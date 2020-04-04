import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';

interface State {
    selectedExpenseBook: object,
    selectedExpenseDetail: object,
    addedExpenseDetail: object,
    editedExpenseDetail: object,
    deleteExpenseDetailId: object,
}

export const expenseState: State = {
    selectedExpenseBook: null,
    selectedExpenseDetail: null,
    addedExpenseDetail: null,
    editedExpenseDetail: null,
    deleteExpenseDetailId: null
};

const createExpenseReducer = createReducer(
    expenseState,
    on(ExpenseActions.selectExpenseBook, (state, value) => {
        return { ...state, selectedExpenseBook: value };
    }),
    on(ExpenseActions.selectExpenseDetail, (state, value) => {
        return { ...state, selectedExpenseDetail: value }
    }),
    on(ExpenseActions.addExpenseDetail, (state, value) => {
        return { ...state, addedExpenseDetail: value }
    }),
    on(ExpenseActions.editExpenseDetail, (state, value) => {
        return { ...state, editedExpenseDetail: value }
    }),
    on(ExpenseActions.delExpenseDetail, (state, value) => {
        return { ...state, deleteExpenseDetailId: value }
    }),
    on(ExpenseActions.resetExpenseDetail, (state) => {
        return expenseState;
    })
)

const expense = createFeatureSelector<State>('expense');

const selectExpenseBook = (state: State) => state.selectedExpenseBook;

const selectExpenseDetail = (state: State) => state.selectedExpenseDetail;

const addExpenseDetail = (state: State) => state.addedExpenseDetail;

const editExpenseDetail = (state: State) => state.editedExpenseDetail

const deleteExpenseDetail = (state: State) => state.deleteExpenseDetailId

export const getSelectedExpenseBook = createSelector(expense, selectExpenseBook);

export const getExpenseDetail = createSelector(expense, selectExpenseDetail);

export const getAddExpenseDetail = createSelector(expense, addExpenseDetail);

export const getEditExpenseDetail = createSelector(expense, editExpenseDetail);

export const getDelExpenseDetailId = createSelector(expense, deleteExpenseDetail);

export function expenseReducer(state: State, action: Action) {
    return createExpenseReducer(state, action);
}
