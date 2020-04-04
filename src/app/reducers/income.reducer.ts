import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as IncomeActions from '../actions/income.action';

interface State {
    selectedIncomeDetail: object,
    addedIncomeDetail: object,
    editedIncomeDetail: object,
    deleteIncomeDetailId: object,
}

export const incomeState: State = {
    selectedIncomeDetail: null,
    addedIncomeDetail: null,
    editedIncomeDetail: null,
    deleteIncomeDetailId: null
};

const createIncomeReducer = createReducer(
    incomeState,

    on(IncomeActions.selectIncomeDetail, (state, value) => {
        return { ...state, selectedIncomeDetail: value }
    }),
    on(IncomeActions.addIncomeDetail, (state, value) => {
        return { ...state, addedIncomeDetail: value }
    }),
    on(IncomeActions.editIncomeDetail, (state, value) => {
        return { ...state, editedIncomeDetail: value }
    }),
    on(IncomeActions.delIncomeDetail, (state, value) => {
        return { ...state, deleteIncomeDetailId: value }
    }),
    on(IncomeActions.resetIncomeDetail, (state) => {
        return incomeState;
    })
)

const income = createFeatureSelector<State>('income');

const selectIncomeDetail = (state: State) => state.selectedIncomeDetail;

const addIncomeDetail = (state: State) => state.addedIncomeDetail;

const editIncomeDetail = (state: State) => state.editedIncomeDetail

const deleteIncomeDetail = (state: State) => state.deleteIncomeDetailId

export const getIncomeDetail = createSelector(income, selectIncomeDetail);

export const getAddIncomeDetail = createSelector(income, addIncomeDetail);

export const getEditIncomeDetail = createSelector(income, editIncomeDetail);

export const getDelIncomeDetailId = createSelector(income, deleteIncomeDetail);

export function incomeReducer(state: State, action: Action) {
    return createIncomeReducer(state, action);
}

