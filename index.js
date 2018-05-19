const express = require('express');
const fs = require('fs');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
let cont = 1;
let valores = '{';
const file = 'c:/valor.json';

const connection = mysql.createConnection({
    host: 'localhost',
    user:'projeti',
    password:'gerico14599',
    database: 'server_sensor'
});

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

conect();

router.post('/enviarbd', (req, res) => {
    let data = new Date();

    var dia     = data.getDate();           // 1-31
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4    = data.getFullYear();       // 4 dígitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59

  
    valores += '"tempo-'+ cont +'":"'+ dia +'-' + mes + '-' + ano4 + '-' + hora + ':' + min + ':' + seg + '", "valor-'+ cont +'":"' + req.body.valor + '"} ';
    console.log('valores ' + cont);
   
        console.log(valores);
        addRows(connection,valores);
    
    res.json({message: 'funfou'});
});

router.get('/receberionic', (req, res) => {
    res.json({ message: 'teste!'});
});


app.use('/', router);

function conect(val){


                connection.connect(function(err){
                    if(err){
                        return console.log(err);
                    }else{
                        console.log("conectou!");
                    }
                   
                });
        
}

function addRows(conn,valor){
    const sql = "INSERT INTO dados VALUES(?)";
    const values = valor;
    conn.query(sql, values, function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros!');
            valores = '{';
        });
  }

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
