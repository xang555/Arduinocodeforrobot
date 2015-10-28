var serv = require("socket.io"); 
var fs = require('fs');
var io = serv.listen(3000);  
console.log("server start"); 
var name={};
io.sockets.on('connection', function(socket) {  
  
    console.log("client connect");
         
    socket.on('robot', function(data) { 
        
       //get values from phone //    
      var pin = data.pin; //pin
      var stat=data.stt; //command
      var whosend=data.name;
      var msg= pin+" : "+stat;
        //=====save file======//
        readwritejson(pin,stat,whosend);
      
      //=================send passing sendmessage===========================//  
        
            console.log(msg);     
        io.sockets.emit('robot', {'pin':pin,'stt':stat,'name':whosend}); // send pin and command
            
       //get values from pi//
       var ack=data.ack; //get values ack; ack:1 when successfully
       if(ack!="" || ack!=null){
            io.sockets.emit('robot',{'ok':1});
        }
        
    }); //on send via robot
 
    //================restore===============================//
    
    socket.on('restore',function (data){ //on restore
         var pin=data.pin; //pin for restore
         restorestat(pin,socket); //restorestat
                
    });//end on restore
    
    //==========stat restores=============//
    
     socket.on('restt',function (data){ //on restt
           
      resstt(socket); //resstt
                            
    });//end restt
    
   //==============send name===================//
   
   socket.on('sendname',function (data){ //on sendname
       
       var username=data.name;
        saveusername(username,socket);   
       
   });//end sendname

   
   //===============disconnect=================//
    
    socket.on('disconnect', function(data) {
   var username=name[socket.id];
    savewhendiscon(username);
     console.log(username +" clien disconnect");
     
    });//end disconnect
    
}); //on connect

//==========function==================//
function appendObject(obj){
  var configFile = fs.readFileSync('./usernametore.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./usernametore.json', configJSON);
}

function removeusername(i){
    
     var configFile = fs.readFileSync('./usernametore.json');
  var config = JSON.parse(configFile);
   config.splice(i,1);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./usernametore.json', configJSON);
        
}//end remove user

function readwritejson(pin,stat,whosend){
    
     var configFile = fs.readFileSync('./store.json');
  var obj = JSON.parse(configFile);
    for(var i=0;i<obj.length;i++){
      
      if(obj[i].pin==pin){
          obj[i].stt=stat;
          obj[i].name=whosend;
         var configJSON = JSON.stringify(obj);
        fs.writeFileSync('./store.json', configJSON);
      }//end if
            
  }//end for
  
    
}//end function readwritwjson

function restorestat(pin,socket){
    
       var configFile = fs.readFileSync('./store.json');
         var obj = JSON.parse(configFile);
          for(var i=0;i<obj.length;i++){
      if(obj[i].pin==pin){
          socket.emit('restore',obj[i]);
          break;
      }
            
  }//end for
    
}

function resstt(socket){
  var configFile = fs.readFileSync('./usernametore.json');
  var config = JSON.parse(configFile);
     socket.emit('restt',config);
    
}//end resstt

function saveusername(username,socket){
    var logic=true;
 var configFile = fs.readFileSync('./usernametore.json');
  var obj = JSON.parse(configFile);
  for(var i=0;i<obj.length;i++){
        var strname=obj[i].name;
       var n = strname.localeCompare(username);
      if(n==0){
          logic=true;
          break;
      }else{
           logic=false;
            continue;
      }//end if else
            
  }//end for
   
 if(!logic){
     appendObject({"name" :username}); //save username
     name[socket.id]=username;
 }//end if
 
  console.log("useraccess to home : "+username);
    
}//end saveuser

function savewhendiscon(username){
  var configFile = fs.readFileSync('./usernametore.json');
  var obj = JSON.parse(configFile);
      for(var i=0;i<obj.length;i++){
      if(obj[i].name==username){
          removeusername(i);
          break;
      }
            
  }//end for
    
}//end savewhendiscon


