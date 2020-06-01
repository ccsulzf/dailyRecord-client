export const filterOption = [{
    type: 'Between',
    value: ['', ''],
    field: 'expenseDate',
    component: 'date',
    name: '日期'
}, {
    type: 'In',
    value: [],
    field: 'addressId',
    model: 'address',
    component: 'select',
    name: '地点'
}, {
    type: 'In',
    value: [],
    field: 'expenseBookId',
    model: 'expenseBook',
    component: 'select',
    name: '账本'
}, {
    type: 'In',
    value: [],
    field: 'expenseCategoryId',
    model: 'expenseCategory',
    component: 'select',
    name: '类别'
}, {
    type: 'In',
    value: [],
    field: 'accountId',
    model: 'account',
    component: 'select',
    name: '账户'
}, {
    type: 'In',
    value: [],
    field: 'expenseStoreId',
    model: 'expenseStore',
    component: 'select',
    name: '收款方'
}, {
    type: 'Like',
    value: '',
    field: 'content',
    component: 'input',
    name: '支出'
}, {
    type: 'Between',
    value: ['', ''],
    field: 'amount',
    component: 'range',
    name: '金额'
}, {
    type: 'In',
    value: [],
    field: 'peopleId',
    model: 'people',
    component: 'label-people',
    name: '参与人'
}, {
    type: 'In',
    value: [],
    field: 'lableId',
    model: 'label',
    component: 'label-people',
    name: '标签'
}, {
    type: 'Like',
    value: '',
    field: 'memo',
    component: 'input',
    name: '备注'
}];
