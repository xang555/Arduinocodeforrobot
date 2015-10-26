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
      var msg= pin+" : "+stat;
        //=====save file======//
        var obj=null;
fs.readFile('./store.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  for(var i=0;i<obj.length;i++){
      
      if(obj[i].pin==pin){
          obj[i].stt=stat;
           fs.writeFile('./store.json', JSON.stringify(obj),function (err){
        if (err) throw err;
        
            });
      }
            
  }
  
});
   
  
 
      //=================send passing sendmessage===========================//  
        
            console.log(msg);     
        io.sockets.emit('robot', {'pin':pin,'stt':stat}); // send pin and command
            
       //get values from pi//
       var ack=data.ack; //get values ack; ack:1 when successfully
       if(ack!="" || ack!=null){
            io.sockets.emit('robot',{'ok':1});
        }
        
    }); //on send via robot
    //
    //================restore===============================//
    
    socket.on('restore',function (data){
        
        var pin=data.pin; //pin for restore
            var obj;
fs.readFile('./store.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  for(var i=0;i<obj.length;i++){
      if(obj[i].pin==pin){
          socket.emit('restore',obj[i]);
                    break;
      }
      
      
  }//end for
 
});
    
        
                
    });
    
   //==============send name===================//
   
   socket.on('sendname',function (data){
       
       var username=data.name;
       var logic=true;
       var obj;
fs.readFile('./usernametore.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
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
  
 
});
      
       io.sockets.emit('extraname',{name:username});
       console.log("useraccess to home : "+username);
       
   });//end sendname
   
   socket.on('extraname',function (data){
       
         var obj;
fs.readFile('./usernametore.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  socket.emit('extraname',obj);
 
});
       
       
   });//end extraname
   
   //===============disconnect=================//
    
    socket.on('disconnect', function(data) {
   var username=name[socket.id];
   var obj;
fs.readFile('./usernametore.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  for(var i=0;i<obj.length;i++){
      if(obj[i].name==username){
          removeusername(i);
          socket.emit('extraname',obj[i]);
                    break;
      }
            
  }//end for
 
});
       
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

