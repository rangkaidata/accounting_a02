/*
 * name: budiono
 * date: sep-04, 15:17, mon-2023; new; 69;
 */

'use strict';

const LIMIT=10;
const array_posting_methods=[
  "Real Time Posting",
  "Batch Posting"
]
const array_accounting_methods=[
  "Cash Basis",
  "Accrual"
]
const array_expired_mode=[
  "15 Minute",
  "1 Hour",
  "8 Hour",
  "24 Hour",
  "Never Expired"
];
const array_account_class=[
   "Asset"
  ,"Liability"
  ,"Equity"
  ,"Income"
  ,"Cost of Sales"
  ,"Expense"
  ,"Other Income"
  ,"Other Expense"
]
const array_cost_type=[
   "Labor"
  ,"Materials"
  ,"Equipment"
  ,"Subcontractors"
  ,"Other"
]
const array_location_type=[
  "0-stock",
  "1-manufacture",
  "2-non-stock"
]
const array_network_status=[
  "Waiting",
  "Join",
  "Leave"
]

function getDataAccountClass(indek){
  var isi='';
  for(var i=0;i<array_account_class.length;i++){
    isi+="<option value="+i+">"+array_account_class[i]+'</option>'
  }
  return isi;
}

function getDataCostType(indek){
  var isi='';
  for(var i=0;i<array_cost_type.length;i++){
    isi+="<option value="+i+">"+array_cost_type[i]+'</option>'
  }
  return isi;
}

function getDataLocationType(indek){
  var isi='';
  for(var i=0;i<array_location_type.length;i++){
    isi+="<option value="+i+">"+array_location_type[i]+'</option>'
  }
  return isi;
}
// eof: 69;
