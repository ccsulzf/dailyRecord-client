import { createAction, props } from '@ngrx/store';
// export const selectExpenseBook = createAction('[ExpenseBook Page] Select ExpenseBook',
// props<Object>());
export const selectExpenseBook = createAction(
    '[ExpenseBook Page] Select ExpenseBook',
    props<object>()
  );

export const selectExpenseDetail = createAction(
  '[ExpenseDetail Page] Select ExpenseExpenseDetail',
  props<object>()
);

export const editExpenseDetail = createAction(
  '[Expense Page] edit ExpenseExpenseDetail',
  props<object>()
);

export const addExpenseDetail =  createAction(
  '[Expense Page] add ExpenseExpenseDetail',
  props<object>()
);

export const delExpenseDetail =  createAction(
  '[Expense Page] del ExpenseExpenseDetail',
  props<object>()
);


