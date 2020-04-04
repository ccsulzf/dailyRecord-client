import { createAction, props } from '@ngrx/store';
export const selectExpenseBook = createAction(
    '[ExpenseBook Page] Select ExpenseBook',
    props<object>()
  );

export const selectExpenseDetail = createAction(
  '[ExpenseDetail Page] Select ExpenseDetail',
  props<object>()
);

export const editExpenseDetail = createAction(
  '[Expense Page] edit ExpenseDetail',
  props<object>()
);

export const addExpenseDetail =  createAction(
  '[Expense Page] add ExpenseDetail',
  props<object>()
);

export const delExpenseDetail =  createAction(
  '[Expense Page] del ExpenseDetail',
  props<object>()
);

export const  resetExpenseDetail =  createAction(
  '[Expense Page] reset ExpenseDetail',
  props<object>()
);

