import { createAction, props } from '@ngrx/store';

export const selectIncomeDetail = createAction(
    '[IncomeDetail Page] Select IncomeDetail',
    props<object>()
);

export const editIncomeDetail = createAction(
    '[Income Page] edit IncomeDetail',
    props<object>()
);

export const addIncomeDetail = createAction(
    '[Income Page] add ExpenseDetail',
    props<object>()
);


export const delIncomeDetail =  createAction(
    '[Income Page] del IncomeDetail',
    props<object>()
  );