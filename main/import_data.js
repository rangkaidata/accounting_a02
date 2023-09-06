/*
 * auth: budiono
 * date: sep-04, 16:34, mon-2023; new;116;
 */ 

'use strict';

iii.uploadJSON=(indek)=>{
  var html='<div style="padding:0 1rem 0 1rem">'
    +'<h1>'+MODE_IMPORT+'</h1>'
    +'<p id="exportTable" style="display:none"></p>'
    +iii.selectFileJSON(indek)
    +'</div>'
  content.html(indek,html);
  statusbar.ready(indek);
}

iii.selectFileJSON=(indek)=>{
  var html=''
    +'<div id="hasil_'+indek+'" style="margin-top:10px;">'
      +'<h2>Step 1: Select file JSON</h2>'
      +'<p>Select File: <input type="file" '
      +' onchange="iii.readFileJSON(this,'+indek+')"></p>'
    +'</div>';
  return html;
}

iii.readFileJSON=(input,indek)=>{
  const file=input.files[0];
  const reader=new FileReader();

  reader.readAsText(file);
  reader.onload = function() {
    //bacaDataJSON(indek,reader.result);
    bingkai[indek].dataImport=JSON.parse(reader.result);
    iii.setData(indek)
  };

  reader.onerror = function() {
    console.log(reader.error);
  };      
}

iii.setData=(indek)=>{
  var data_import=bingkai[indek].dataImport;
  var data=[];
  var arr={};
  var html;
  var tabel='';
  
  // restore data
  var d=(data_import);
  var jml=d.fields.length;
  var j;
  
  tabel="<table>";
    +'<tr>'
  
  for(var t=0;t<d.fields.length;t++){
    tabel+='<th>'+d.fields[t]+'</th>';
  }
  +'</tr>'
  
  if(jml==0){
    jml=d.data.length;
    if(jml>0){
      jml=d.data[0].length;
    }
  }
  
  for(var i=0;i<data_import.data.length;i++){
    tabel+='<tr>'
    for(j=0;j<jml;j++){
      tabel+='<td>'+tHTML(data_import.data[i][j])+'</td>';
    }
    tabel+='</tr>'
  }
  tabel+="</table>"
  
  html='<h2>Step 2: Insert Data </h2>'
    +'<button'
    +' id="btn_import_all_'+indek+'"'
    +' onclick="iii.importExecute('+indek+');">'
    +'Import Data</button>'
    +'<p id="msgImport_'+indek+'"></p><br>'
    +'<p>'+data_import.data.length+' rows ready.'
    +' Klik button [<b>Import Data</b>] to process.</p>'
    +'<div style="overflow-y:auto;">'
    +'<pre>'+tabel
    +'</pre></div>'
  document.getElementById('hasil_'+indek).innerHTML=html;
}


iii.importExecute=(indek)=>{
  const modul=bingkai[indek].menu.id;
  switch(modul){
    case "cost_codes":
      Costs.importExecute(indek);break;
    case "phases":
      Phases.importExecute(indek);break;
    case "accounts":
      Accounts.importExecute(indek);break;
    case "locations":
      Locations.importExecute(indek);break;
    case "item_taxes":
      ItemTaxes.importExecute(indek);break;
    case "ship_methods":
      ShipVia.importExecute(indek);break;
    case "pay_methods":
      PayMethods.importExecute(indek);break;
    case "manage_users":
      Users.importExecute(indek);break;

    default:
      alert('['+modul +'] undefined in [import_data.js]. ');
  }
}
// eof: 116;
