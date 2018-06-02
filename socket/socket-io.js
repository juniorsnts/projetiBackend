const formData = require('../formData');
let io = null;
var obj = {
    connect: function(http){
        io = require('socket.io')(http);
        io.on('connection', (socket) => {
            socket.on('disconnect', function(){
                var formhora =  formData("hora");
                console.log('[' + formhora + '] disconectou do socket: ' + socket.id);
            });
            var formhora =  formData("hora");
            console.log('[' + formhora + '] conectado ao socket: ' +  socket.id);
        });
    },

    emit: function(valores){
        if(io != null){
            io.emit('valores',valores);
        }
    },

    alert: function(alert){
        if(io != null){
            io.emit('alert',true);
        }
    }
}

module.exports = obj;