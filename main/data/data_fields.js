/*
 * name: budiono
 * date: sep-04, 11:27, mon-2023; new;34;
 */
 
const data_fields=[
  ['record_id','Record ID'],
  ['process_id','Process ID'],
  ['user_name','User Name'],
  ['retype_passcode','Retype Passcode'],
  ['user_fullname','User Full Name'],
  ['user_password','Password'],
  ['confirm_password','Comfirm Password'],
  ['home_id','Home ID'],
  ['company_id','Company ID'],
  ['end_date','End Date'],
  ['start_date','Start Date'],
  ['account_id','Account ID'],
  ['item_tax_id','Tax ID'],
  ['location_id','Location ID'],
  ['phase_id','Phase ID'],
  ['cost_id','Cost ID'],
  ['ship_id','Ship VIA'],
  ['pay_method_id','Pay Method ID'],
  ['invite_id','Invite ID'],
];

function nmKolom(str){
  for(var i=0;i<data_fields.length;i++){
    if(data_fields[i][0]==str){
      return data_fields[i][1];
    }
  }
  return str+'?';
}
// eof: 34;

