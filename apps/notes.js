/*
 * auth: budiono
 * date: sep-04, 20:15, mon-2023;new;44
 */ 
 
'use strict';

var Notes={
  title:'Notes',
  url:'notes'
}

Notes.show=(tiket)=>{
  tiket.bisa.tambah=1;
  const baru=exist(tiket);
  if(baru==-1){
    const newReg=new BingkaiUtama(tiket);
    const indek=newReg.show();
    Notes.formCreate(indek);
  }else{
    show(baru);
  }  
}

Notes.formCreate=(indek)=>{
  toolbar.hide(indek);
  Notes.form(indek);
}

Notes.form=(indek)=>{
  const tinggi=document.getElementById('frm_konten_'+indek).offsetWidth+'px';
  const html='<div align="center">'
    +'<form autocomplete="off">'
      +'<textarea id="konten_'+indek+'"'
      +' spellcheck="false"'
      +' style="width:99%;height:'+tinggi+';top:0;border:0px;font-size:16px;">'
      +'</textarea>'
    +'</form>'
  +'</div>';
  content.html(indek,html);
  statusbar.ready(indek);
  document.getElementById('konten_'+indek).focus();
}
// eof:44;
