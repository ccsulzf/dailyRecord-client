export const filterOption = [{
    type: 'Between',
    value: {
        start: '',
        end: ''
    },
    field: 'expenseDate',
    component: 'date',
    name: 'ExpenseDate'
}, {
    type: 'In',
    value: [],
    field: 'expenseBookId',
    model: 'expenseBook',
    component: 'select',
    name: 'ExpenseBook'
}, {
    type: 'In',
    value: [],
    field: 'addressId',
    model: 'address',
    component: 'select',
    name: 'Address'
}, {
    type: 'In',
    value: [],
    field: 'expenseCategoryId',
    model: 'expenseCategory',
    component: 'select',
    name: 'ExpenseCategory'
}, {
    type: 'In',
    value: [],
    field: 'payChannelId',
    model: 'payChannel',
    component: 'select',
    name: 'PayChannel',
    payChannelType: 1
}, {
    type: 'In',
    value: [],
    field: 'expenseStoreId',
    model: 'expenseStore',
    component: 'select',
    name: 'ExpenseStore'
}, {
    type: 'Like',
    value: [],
    field: 'expenseContent',
    component: 'input',
    name: 'ExpenseContent'
}, {
    type: 'Between',
    value: {
        min: '',
        max: ''
    },
    field: 'amount',
    component: 'range',
    name: 'Amount'
}, {
    type: 'In',
    value: [],
    field: 'peopleId',
    model: 'People',
    component: 'label-people',
    name: 'People'
}, {
    type: 'In',
    value: [],
    field: 'lableId',
    model: 'Label',
    component: 'label-people',
    name: 'Label'
}];
