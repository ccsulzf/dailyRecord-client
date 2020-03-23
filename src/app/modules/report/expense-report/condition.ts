export const filterOption = [{
    type: 'Between',
    value: ['', ''],
    field: 'expenseDate',
    component: 'date'
}, {
    type: 'In',
    value: [],
    field: 'expenseBookId',
    model: 'ExpenseBook',
    component: 'select'
}, {
    type: 'In',
    value: [],
    field: 'addressId',
    model: 'Address',
    component: 'select'
}, {
    type: 'In',
    value: [],
    field: 'expenseCategoryId',
    model: 'ExpenseCategory',
    component: 'select'
}, {
    type: 'In',
    value: [],
    field: 'payChannelId',
    model: 'PayChannel',
    component: 'select'
}, {
    type: 'In',
    value: [],
    field: 'expenseStoreId',
    model: 'ExpenseStore',
    component: 'select'
}, {
    type: 'Like',
    value: [],
    field: 'expenseContent',
    component: 'input'
}, {
    type: 'Between',
    value: [],
    field: 'amount',
    component: 'range'
}, {
    type: 'In',
    value: [],
    field: 'peopleId',
    model: 'People',
    component: 'label-people'
}, {
    type: 'In',
    value: [],
    field: 'lableId',
    model: 'Label',
    component: 'label-people'
}];
