import { createAction, props } from '@ngrx/store';

export const addBaseData = createAction(
    '[Expense OR Income Page] Add BaseData',
    props<object>()
  );
