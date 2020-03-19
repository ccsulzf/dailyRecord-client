import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.action';

interface State {
    selectedExpenseBook: object,
    selectedExpenseDetail: object,
    addedExpenseDetail: object,
    editedExpenseDetail: object,
    deleteExpenseDetailId:object,
}

export const expenState: State = {
    selectedExpenseBook: null,
    selectedExpenseDetail: null,
    addedExpenseDetail: null,
    editedExpenseDetail: null,
    deleteExpenseDetailId:null
};

const expenseBookReducer = createReducer(
    expenState,
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
    })
)

const expenseState = createFeatureSelector<State>('expense');

const selectExpenseBook = (state: State) => state.selectedExpenseBook;

const selectExpenseDetail = (state: State) => state.selectedExpenseDetail;

const addExpenseDetail = (state: State) => state.addedExpenseDetail;

const editExpenseDetail = (state: State) => state.editedExpenseDetail

const deleteExpenseDetail = (state: State) => state.deleteExpenseDetailId

export const getSelectedExpenseBook = createSelector(expenseState, selectExpenseBook);

export const getExpenseDetail = createSelector(expenseState, selectExpenseDetail);

export const getAddExpenseDetail = createSelector(expenseState, addExpenseDetail);

export const getEditExpenseDetail = createSelector(expenseState, editExpenseDetail);

export const getDelExpenseDetailId = createSelector(expenseState, deleteExpenseDetail);

export function expenseReducer(state: State, action: Action) {
    return expenseBookReducer(state, action);
}
