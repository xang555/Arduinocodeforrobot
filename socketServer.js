var serv = require("socket.io"); 
var fs = require('fs');
var io = serv.listen(3000);  
console.log("server start"); 

io.sockets.on('connection', function(socket) {  
  
    console.log("client connect");
         
    socket.on('robot', function(data) { 
        
       //get values from phone //    
      var pin = data.pin; //pin
      var stat=data.stt; //command
      var msg= pin+" : "+stat;
        //save file
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
   
  
 
      //============================================//  
        
            console.log(msg);     
        io.sockets.emit('robot', {'pin':pin,'stt':stat}); // send pin and command
            
       //get values from pi//
       var ack=data.ack; //get values ack; ack:1 when successfully
       if(ack!="" || ack!=null){
            io.sockets.emit('robot',{'ok':1});
        }
        
    }); //on send via robot
    //===============================================//
    
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
    
    
    
    socket.on('disconnect', function() {
      //io.sockets.emit('disconnect',{"name":"disconnect"});
     console.log("clien disconnect");
 
    });//end disconnect
    
}); //on connect

function updatedb(val,status){
 var i=0;   

        
}//end function

