var serv = require("socket.io"); 
var io = serv.listen(3000);  
console.log("server start"); 

io.sockets.on('connection', function(socket) {  
  
      console.log("client connect");
    socket.on('robot', function(data) { 
        
       //get values from phone //    
      var pin = data.pin; //pin
      var stat=data.stt; //command
      var msg= pin+" : "+stat;
      
            console.log(msg);     
            io.sockets.emit('robot', {'pin':pin,'stt':stat}); // send pin and command
            
       //get values from pi//
       var ack=data.ack; //get values ack; ack:1 when successfully
       if(ack!="" || ack!=null){
            io.sockets.emit('robot',{'ok':1});
        }
        
    }); //on send via robot
  
    
    socket.on('disconnect', function() {
      //io.sockets.emit('disconnect',{"name":"disconnect"});
     console.log("clien disconnect");
 
    });//end disconnect
    
}); //on connect
