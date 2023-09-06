/*
 * auth: budiono
 * date: sep-04, 16:10, mon-2023; new;98;
 */ 

'use strict';

var Logout={
  url:'login'
};

Logout.show=(tiket)=>{
  tiket.modul=Logout.url;
  tiket.ukuran.lebar=45;
  tiket.ukuran.tinggi=28;
  tiket.toolbar.ada=0;
  tiket.bisa.besar=0;
  tiket.bisa.kecil=0;
  tiket.bisa.ubah=0;
  tiket.letak.atas=0;

  const baru=exist(tiket);
  if(baru==-1){
    const newReg=new BingkaiSpesial(tiket);
    const indek=newReg.show();
    Logout.formDelete(indek);
  }else{
    show(baru);
  }  
}

Logout.formDelete=(indek)=>{
  Logout.form01(indek);
  Logout.read_one(indek);
}

Logout.deleteExecute=(indek)=>{
  if (document.getElementById("btn_logout_"+indek).innerHTML==Logout.txtEnd){
    location.reload();
    return;
  }
  
  message.wait(indek);  
  Login.remove(indek,{
    "login_id":bingkai[0].login.id
  },(paket)=>{    
    if(paket.err.id==0) {
      sessionStorage.removeItem('login_id');
      Logout.txtEnd="Log Out OK. Press F5 to Refresh Page and Log In."
      document.getElementById("btn_logout_"+indek).innerHTML=Logout.txtEnd;
    }
    db.infoPaket(indek,paket);
  });
}

Logout.form01=(indek)=>{
  const html='<div class="div-center">'
    +'<div id="msg_'+indek+'" style="padding:1rem;line-height:1.5rem;"></div>'
    +'<ul>'
      +'<li><label>User Name</label>: <i id="name_'+indek+'"></i></li>'
      +'<li><label>Full Name</label>: <i id="fullname_'+indek+'"></i></li>'
      +'<li><label>Size</label>: <i id="size_'+indek+'"></i> tx</li>'
      +'<li><label>Used</label>: <i id="used_'+indek+'"></i> tx</li>'
      +'<li><label>Login Date</label>: <i id="login_date_'+indek+'"></i></li>'
      +'<li><label>Login ID</label>: <i id="login_id_'+indek+'"></i></li>'
      +'<li><label>Login Expired in</label>: <i id="login_expired_'+indek+'"></i></li>'
      +'<li><label>Login Duration</label>: <i id="login_duration_'+indek+'"></i></li>'
    +'</ul>'
    +'<br>'
    +'<button id="btn_logout_'+indek+'" value="Log Out"'
      +' onclick="Logout.deleteExecute(\''+indek+'\');">'
      +Menu.ikon3('Exit')+'Log out'
      +'</button>'
      
    +'</div>'
  content.html(indek,html);
}

Logout.read_one=(indek)=>{
  Login.read_one(indek,{
    'login_id':bingkai[indek].login.id
  },(paket)=>{
    if(paket.err.id==0){
      const v=paket.data;
      document.getElementById('name_'+indek).innerHTML=v.user.name;
      document.getElementById('fullname_'+indek).innerHTML=v.user.fullname;
      document.getElementById('size_'+indek).innerHTML=v.quota.size;
      document.getElementById('used_'+indek).innerHTML=v.quota.used;
      
      document.getElementById('login_date_'+indek).innerHTML=tglInt(v.login.date);
      document.getElementById('login_id_'+indek).innerHTML=blokID(bingkai[0].login.id);
      document.getElementById('login_expired_'+indek).innerHTML=array_expired_mode[v.login.expired_mode];
      document.getElementById('login_duration_'+indek).innerHTML=v.login.duration;
    }
    statusbar.message(indek,paket);
    if(paket.err.id!=0) content.infoPaket(indek,paket);
  });
}
// 98;
