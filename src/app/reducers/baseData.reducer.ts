import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as BaseDataAction from '../actions/baseData.action';

interface State {
    baseData: object;
}

export const baseState: State = {
    baseData: null,
};

const baseReducer = createReducer(
    baseState,
    on(BaseDataAction.addBaseData, (state, value) => {
        return { ...state, baseData: value };
    })
)

const baseDataState = createFeatureSelector<State>('baseData');

const baseData = (state: State) => state.baseData;

export const getAddBaseData = createSelector(baseDataState, baseData);

export function baseDataReducer(state: State, action: Action) {
    return baseReducer(state, action);
}