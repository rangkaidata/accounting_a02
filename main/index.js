/*
 * auth: budiono
 * date: aug-31, 06:53, thu-2023; new; 195;
 * edit: sep-04, 21:40, mon-2023; add; 201;
 */ 

'use strict';
//====SETTING KONEKSI KE DATABASE SERVER/LOKAL========//
const config_local={
  url:'http://localhost:8080/',
  image:'http://localhost/image/',
}
const config_server={
  //url:'http://34.101.166.144/',
  url:'http://35.225.28.242/', // google cloud 
  image:'http://rangkaidata.com/image/',
}
/* GANTI DISINI UNTUK KONEKSI KE SERVER ATAU KE LOKAL */
const config=config_server;
//====================================================//
const document_title="Rangkai Data";
var nBebas={
  gimana:false,
  indek:-1
}
var content={};
var recent_count=0;
var bingkai_posisi=[{
  indek:0,
  dead:0,
  name:''
}];
var Drag={};
var Resize={};
var global={
  login_blok:null,
  tabPasif:0,
  klik:true,
}
var layar={
  lebar:0,
  tinggi:0,
}
var ui={
  zindek:0,
  global_url:'',
  menu_bar_show:false,
  modal:false,
  warna:{
    form:'#F5F5F5',
    toolbar:'#F5F5F5',
  },
  titlebar:{
    tinggi:1.7,
    warna:"#d0d3d4",
  },
  unit:'rem',
};
var datanya=[
  {"id":"home","name":"&#9776","submenu":[],"status":"1","display":"inline-block"},
  {"id":"window","name":"Recent","submenu":[],"status":"1","display":"none"}
];
var Menu=[];
var bingkai=[{
  parent:0,
  nama:'',
  modul:'',
  server:{
    url:config.url,
    image:config.image,
  },
  login:{
    id:null,
    name:'Your Name',
    full_name:'Your Full Name',
  },
  company:{
    id:'',
    name:'',
  },
  invite:{
    id:null,
    name:null,
  },
  menu:{
    id:null,
    name:null,
    type:null,
    data:[],
  },
  group:{
    id:'net',
  },
  closed:1,
  status:1,
  letak:{
    tengah:1,
    atas:3.50,
    kiri:3.50,
  },
  ukuran:{
    lebar:60,
    tinggi:35,
  },
  bisa:{
    hilang:1,
    tutup:1,
    kecil:1,
    besar:1,
    sedang:1,
    tambah:1,
    gerak:1,
    ubah:1,
  },
  modal:0,
  child_free:true,
  path:'',
  folder:'',
  statusbar:{
    ada:1,
    tinggi:3.00,
  },
  titlebar:{
    ada:1,
    tinggi:1.50,
    warna:""
  },
  toolbar:{
    ada:1,
    tinggi:1.90,
    warna:'#F5F5F5',
    button:{
      atas:0.1,
      kiri:0.25,
      tinggi:1.50,
    }
  },
  warna:'#F5F5F5',
  unit:"rem",
  baru:false,
  home:{
    id:'',
    name:'',
  }
}];
var antrian=[];
var message={};
var db={};
var db1={};
var db3={};
var iii={}

function main(){  
  var paket={
    err:-1
  };
  // sessionStorage.removeItem('login_id');
  
  bingkai[0].login.id=sessionStorage.getItem('login_id')
  console.log(bingkai[0].login.id);
  
  if (bingkai[0].login.id==null){
    belumLogin(0);
  }else{
    sudahLogin(0);
  }
}

function sudahLogin(indek){
  bingkai[0].modul='login'
  Login.read_one(indek,{
    'login_id':bingkai[indek].login.id
  },(paket)=>{
    if(paket.err.id==0){

      bingkai[0].login.name=paket.data.user.name
      bingkai[0].login.full_name=paket.data.user.fullname
      bingkai[0].group.id=paket.data.group.id

      Menu.server();
    }else{
      belumLogin(0);
    }
  });
}

function belumLogin(paket){
  if (paket.err===24){
    // login expired
  }
  else{
    bingkai[0].login.id=null;
    sessionStorage.removeItem('login_id');
  }
  Menu.lokal();
  var tiket=JSON.parse(JSON.stringify(bingkai[0]));
  Login.show(tiket);
}

function updateJam(){
  if(document.getElementById('menu_bar_r'))
  document.getElementById('menu_bar_r').innerHTML=tglSekarangUpdate();
}
// eof: 195;201;
