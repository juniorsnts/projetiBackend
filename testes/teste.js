let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var visitas = 0;

io.on('connection', (socket) => {
    socket.on('disconnect', function(){
        console.log('disconectou');
    });
  
  console.log('conectado ao socket');
  teste();
}).off;

function teste(){
    setTimeout(function(){
        io.emit('visits', visitas);
    },2000);

}

var port = 3000;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});