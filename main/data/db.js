/*
 * auth: budiono
 * date: sep-04, 11:01, mon-2023; new file;207;
 * edit: sep-05, 10:41, tue-2023; mod;214;
 */
 
'use strict';

const xhr={};
const BEGIN=true;
const END=false
const MODE_CREATE='Create Data [C]';
const MODE_READ='Read Data [R]';
const MODE_UPDATE='Update Data [U]';
const MODE_DELETE='Delete Data [D]';
const MODE_RESULT='Search Result [S]';
const MODE_EXPORT='Export Data [E]';
const MODE_SEARCH='Text to Search [T]';
const MODE_IMPORT='Export Data [i]';

xhr.api=function(xyz,obj,callback){
  var request = new XMLHttpRequest();
  var dbParam = JSON.stringify(obj);
  
  request.onload=function(){
    if (request.readyState===4){
      console.log(request.response);
      const lebar_response=myTrim(request.response);
      if(lebar_response.length==0){
        callback({"err":-5
          ,"msg":"Server response error. No data packet!!!"
        });
      }else{
        const paket = JSON.parse(request.responseText);
        if(paket.err==24){
          ui.clearForm(paket);
        }else{ 
          callback(paket);
        }
      }
    }
    else {
      console.log('Network request failed with response ' 
        + request.status + ': ' 
        + request.statusText);
    }
  };
  request.onerror=function(err){
    callback({
      err:{
        id:-7,
        msg:"No Response. Server error / can't connect."
      }
    });
  }
  request.open('POST', xyz);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(dbParam);
}

db.query=function(indek,endpoint,dataku,callback){
  xhr.api(
    bingkai[indek].server.url+endpoint,
    dataku,
    callback,
  );
}

db.infoPaket=function(indek,paket){
  message.paket(indek,paket);
  statusbar.message(indek,paket);
  document.getElementById('frm_konten_'+indek).scrollTop = 0;
}

db.info=function(paket){
  var pesan='';
  if (paket.err.id===0){
    pesan='<span style="background-color:#b3ffb3;';
  }else{
    pesan='<span style="background-color:#ffb3b3;';
  }
  pesan+='padding:0.5rem;border-radius:0rem 1rem 1rem 0rem;">';
  pesan+=db.error(paket);
  pesan+='<span class="close" onclick="db.tutupMsg(this);">\u00D7</span></span>';
  return pesan;
}

db.error=function(paket){
  // console.log(paket);
  var msg_custom=paket.err.msg;
  var key=paket.err.key;
  var val=paket.err.value;
  
  switch(paket.err.id){
    case 0: // success execute
      switch(paket.metode){
        case "create":
          msg_custom="Create OK. 1 record created. "
          break;
        case "update":
          msg_custom="Update OK. 1 record updated. "
          break;
        case "delete":
          msg_custom="Delete OK. 1 record deleted. "
          break;
        case "read_paging":
          msg_custom="Read Paging OK. "+paket.count+' rows. '
          break;
        case "search":
          msg_custom="Search OK. "+paket.count+' rows. '
          break;
        case "read_id":
          msg_custom="Read One OK. "+paket.count+' rows. '
          break;
        case "read_one":
          msg_custom="Read One OK. "+paket.count+' rows. '
          break;
        case "read":
          msg_custom="Read OK. "+paket.count+' rows. '
          break;
        case "export":
          msg_custom="Export OK. "+paket.count+' rows. '
          break;
        default:
          msg_custom="Message error ["
            +paket.err.key[0]+"] not defined. "
          break;
      }
      break;

    case 404:
      msg_custom=paket.err.msg+'. ';
      break;
    case -1:
      msg:"No Response. Server error / can't connect. Connection lost."
    case -7:
    case 1:
      msg_custom='You must enter data raw. ';
      break;
    case 2:
      msg_custom='Incorrect input data raw. ';
      break;
    case 3:
      msg_custom='<b>You must enter</b> ['+nmKolom(key[0])+']. ';
      break;
    case 4:
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>already exists.</b>';
      break;
    case 5:// wrong
      msg_custom='<b>Incorrect</b> '+nmKolom(key[0])+' ['+val[0]+'].';
      if(val[1]!=undefined) msg_custom+=' <b>Please wait</b> '+val[1];
      break;
    case 6:// must same
      msg_custom='<b>Not same</b> ['+key[0]+'], ['+key[1]+']. ';
      break;
    case 7:  // tidak terdaftar
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>does not exist.</b>';
      break;
    case 8:// record lock by proccess
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>lock by</b> '
        +nmKolom(key[1])+' ['+val[1]+'], <b>try again later!</b>';
      break;
    case 9:// not enough quota
      msg_custom='<b>Please add quota.</b>';
      break;
    case 10:// login-expired
      msg_custom='<b>Login expired.'
        +' Please Press F5 to Refresh Page.</b> '
        +key[0]+' ['+val[0]+']';
      break;
    case 12:// is root
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>is root</b>';
      break;      
    case 13:// no access
      msg_custom='<b>Access Denied.</b> '
        +key[1]+' [<b>'+akses(val[1])+'</b>]. '
        +key[2]+' [<b>'+akses(val[2])+'</b>]';
      break;      
    case 14:// character for ID
      msg_custom='<b>Can not accept character</b> '
        +key[0]+' ['+val[0]+']'
      break;
    case 15:
      msg_custom='<b>You must ['
        +array_network_status[1]
        +'] a network. Status</b> '
        +key[0]+' [<b>'+array_network_status[val[0]]+'</b>]'
      break;
    case 20:
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>less than</b> '
        +nmKolom(key[1])+' ['+val[1]+']';
      break;
    case 22:// tidak boleh sama
      msg_custom=nmKolom(key[0])+' ['+val[0]+'] <b>can not be same values</b> '
        +nmKolom(key[1])+'['+val[1]+']';
      break;
    default:
      msg_custom='Error id: '+paket.err.id+', not defined. ';
      break;
  }
  return msg_custom;
}

db.read=function(indek,abc){
  bingkai[indek].metode=MODE_READ;
  toolbar.wait(indek,BEGIN);
  content.wait(indek);
  bingkai[indek].text_search="";
  
  xhr.api(
    bingkai[indek].server.url+
    bingkai[indek].modul+'/read',
    {
      "login_id":bingkai[indek].login.id,
      "company_id":bingkai[indek].company.id
    },(paket)=>{
      bingkai[indek].paket=paket;
      statusbar.message(indek,paket);
      toolbar.wait(indek,END);
      return abc(paket);
  });
}

db.endPoint=function(indek,metode){
  return bingkai[indek].server.url+''+
  bingkai[indek].modul+'/'+metode;
}

db.tutupMsg=function(a){
  var div = a.parentElement;
  div.style.display = "none";
}
// eof: 207;214;
