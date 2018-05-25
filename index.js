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

conect();

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req,res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

//definindo as rotas
const router = express.Router();

router.post('/enviarbd', (req, res) => {
    var data = new Date();
    var dia = data.getDate();// 1-31
    var mes = data.getMonth() + 1;// 0-11 (zero=janeiro)
    var ano = data.getFullYear();// 4 dígitos
    var formdata = dia + "/" + mes + "/" + ano; 
    let valor = req.body.valor;
    let tipo = req.body.tipo;
    let hora = req.body.hora;
    valores.push([tipo,valor,hora]);
    console.log('valore.length => ' + valores.length);
if(valores.length == 5){
    console.log('valores => ' + valores);
    addRows(connection,valores);
}
res.json({message: 'funfou'});
    //valores += '"tempo-'+ cont +'":"'+ dia +'-' + mes + '-' + ano4 + '-' + hora + ':' + min + ':' + seg + '", "valor-'+ cont +'":"' + req.body.valor + '"} ';
});

router.get('/receberionic', (req, res) => {
    console.log("conectou ", req.query.data);
    var data = req.query.data;
    var campo = req.query.campo;
    if(data == "*"){
        select2(connection,res);
    }else{
        select(connection,data,campo,res);
    }
    //res.json({ message: 'busca feita!'});
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

function select(conn,data,campo,res){
    //conect();
    console.log("data = ",data);
        
        console.log("pesquisa especifica para = ", data , " do campo ",campo);
        const select = "SELECT * FROM dados where "+ campo +" = ? ";

    conn.query(select,data, function (error, results, fields){
        if(error) return console.log(error);
        res.json(results);
        console.log('enviou registros!');
        //conn.end();
    });
}

function select2(conn,res){
    //conect();

            console.log("pesquisa total");
            const select = "SELECT * FROM dados";

    conn.query(select, function (error, results, fields){
        if(error) return console.log(error);
        res.json(results);
        console.log('enviou registros!');
        //conn.end();
    });
}

function addRows(conn,valor){
    //conect();
    const sql = "INSERT INTO dados(tipo,valor,hora) VALUES ?";
    const values = valor;
    conn.query(sql, [values], function (error, results, fields){
            if(error){
                return console.log(error);
                //conn.end();
                valores = [];
            }else{
                console.log('adicionou registros!');
                //conn.end();
                valores = [];
            }
        });
  }

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
