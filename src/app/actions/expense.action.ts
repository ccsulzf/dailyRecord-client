import { createAction, props } from '@ngrx/store';
// export const selectExpenseBook = createAction('[ExpenseBook Page] Select ExpenseBook',
// props<Object>());
export const selectExpenseBook = createAction(
    '[ExpenseBook Page] Select ExpenseBook',
    props<object>()
  );

export const addExpenseBaseData = createAction(
  '[Expense Page] Add ExpenseBaseData',
  props<object>()
);

