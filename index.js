const express = require('express');
const fs = require('fs');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
let cont = 1;
let valores = [];
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

app.use(function (req,res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

//definindo as rotas
const router = express.Router();

conect();

router.post('/enviarbd', (req, res) => {
    let data = Math.floor(Math.random() * 10);
    let valor = req.body.valor
    valores.push([data,valor]);
    console.log('valore.length => ' + valores.length);
if(valores.length == 5){
    console.log('valores => ' + valores);
    addRows(connection,valores);
}
res.json({message: 'funfou'});
    //valores += '"tempo-'+ cont +'":"'+ dia +'-' + mes + '-' + ano4 + '-' + hora + ':' + min + ':' + seg + '", "valor-'+ cont +'":"' + req.body.valor + '"} ';
    

});

router.get('/receberionic', (req, res) => {
    console.log("conectou");
    //res.json({ message: 'teste!'});
    select(connection,res);
});


app.use('/', router);

function conect(val){


                connection.connect(function(err){
                    if(err){
                        return console.log(err);
                    }else{
                        console.log("funfou!");
                    }
                   
                });
        
}

function select(conn,res){

    const select = "SELECT * FROM dados";

    conn.query(select, function (error, results, fields){
        if(error) return console.log(error);
        res.json(results);
        console.log('enviou registros!');
        conn.end();
    });
}

function addRows(conn,valor){
    const sql = "INSERT INTO dados(id,data) VALUES ?";
    const values = valor;
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros!');
        });
  }

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
