const express = require('express');
const fs = require('fs');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var db = require('./dbJson.js');
let valores = [];
const file = 'c:/valor.json';
const crypto = require('crypto');

//dados da criptografia
const criptografar_dados = {
    algoritmo: "aes256",
    segredo: "asd123",
    tipo: "hex"
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'server_sensor'
});

conect();

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


//definindo as rotas
const router = express.Router();

//criptografando senha
function criptografar(senha){
    const cypher = crypto.createCipher(criptografar_dados.algoritmo, criptografar_dados.segredo);
    cypher.update(senha);
    return cypher.final(criptografar_dados.tipo);
}
//rota de cadastro de novo usuario
router.post('/inserirUsuario', (req, res)=>{
    var formhora =  formData("hora");
    console.log('[' + formhora + '] Requisição para inserir usuario via POST');    
    const nomeUsuario = req.body.nomeUsuario;
    const senha_criptografada = criptografar(req.body.senha);
    //console.log(nomeUsuario);
    //console.log(senha_criptografada);
    cadastroNovoUsuario(connection,res,nomeUsuario,senha_criptografada);    
});
//rota para autenticar usuario cadastrado
router.post('/autenticaUsuario', (req, res) => {
    var formhora =  formData("hora");
    console.log('[' + formhora + '] Requisição para autenticar usuario via POST');
    const nome = req.body.nome;
    const senha = criptografar(req.body.senha);
    autenticaUsuario(connection, res, nome, senha); 
});

router.post('/enviarbd', (req, res) => {
    valores = req.body;
    var formhora =  formData("hora"); 
    var formdata = formData("data");
    //console.log('[' + formhora + '] valore.length => ' + valores.length);
    console.log('[' + formhora + '] Requisição para salvar informações via POST');
    var local = __dirname + '/db/'+ formdata +'.json';
    var fileContent = fs.exists(local, function(exists){
    if(exists){
        formhora =  formData("hora");
        console.log("[" + formhora + "] O arquivo já existe");
        formhora =  formData("hora");
        console.log("[" + formhora + "] Adicionando informações no arquivo: " + formdata + ".json");
        var fileJson = db.getData(formdata);
        fileJson.push(valores);
        db.saveData(fileJson,formdata);
        formhora =  formData("hora");
        console.log("[" + formhora + "] Informações adicionadas no arquivo: " + formdata + ".json");
        console.log("[" + formhora + "]  Length do arquivo: " + formdata + ".json: " + fileJson.length);
        res.json("attDados");
    }else{
        formhora =  formData("hora");
        console.log("[" + formhora + "] o arquivo não existe");
        formhora =  formData("hora");
        console.log("[" + formhora + "] Crinado arquivo: " + formdata + ".json");
        valores = JSON.stringify(valores);
        valores = "[" + valores + "]";
        valores = JSON.parse(valores);
        db.saveData(valores,formdata);
        formhora =  formData("hora");
        console.log("[" + formhora + "] Arquivo (" + formdata + ".json ) Criado");
        res.json("newDados");
    }
    });
});

router.get('/receberionic', (req, res) => {
    
    var data = req.query.data;
    var formhora =  formData("hora"); 
    console.log("[" + formhora + "] Requisição de informações do dia: ", req.query.data);
    formhora =  formData("hora");
    console.log("[" + formhora + "] requisitado pelo ip: ",req.ip);
    formhora =  formData("hora");
    console.log("[" + formhora + "] protocol: ",req.protocol);
    var campo = req.query.campo;
    var local = __dirname + '/db/'+ data +'.json';
    var fileContent = fs.exists(local, function(exists){
        if(exists){
            formhora =  formData("hora");
            console.log("[" + formhora + "] o arquivo existe");
            var arquivoJson = db.getData(data);
            res.json(arquivoJson);
        }else{
            formhora =  formData("hora");
            console.log("[" + formhora + "] o arquivo nao existe");
            res.json("noexiste");
        }
    });
});

app.use('/', router);

function formData(tipo){
    var data = new Date();
    var dia = data.getDate();// 1-31
    if (dia < 10){
        dia = "0" + dia;
    }
    var mes = data.getMonth() + 1;// 0-11 (zero=janeiro)
    if (mes < 10){
        mes = "0" + mes;
    }
    var ano = data.getFullYear();// 4 dígitos
    var hora = data.getHours();          // 0-23
    if (hora < 10 || hora == 0){
        hora = "0" + hora;
    }
    var min = data.getMinutes();// 0-59
    if (min < 10 || min == 0){
        min = "0" + min;
    }
    var seg = data.getSeconds();// 0-59
    if (seg < 10 || seg == 0){
        seg = "0" + seg;
    }
    var formhora = hora + ":" + min + ":" + seg; 
    var formdata = dia + "-" + mes + "-" + ano; 
    if(tipo == "hora"){
        return formhora;
    }
    if(tipo == "data"){
        return formdata;
    }
    
}

function conect(val){
    var formhora =  formData("hora");
    connection.connect(function(err){
        if(err){
            formhora =  formData("hora");
            return console.log("[" + formhora + "] Erro no banco de dados");
        }else{
            console.log("[" + formhora + "] Banco de dados conectado");
        }
    });
}

function cadastroNovoUsuario(connection, res, nomeUsuario, senha_criptografada){
    var formhora =  formData("hora");
    const buscaDados = "SELECT nomeusuario FROM login WHERE nomeusuario = ?";
    
    connection.query(buscaDados, [nomeUsuario] , function(error, results){
        if(error) res.json(error);
        else if(results.length == 1){
            console.log('[' + formhora + '] Usuario ja existe');
            res.json('existe');
        } else if(results.length == 0){
            //cadastrar no banco o usuario
            formhora =  formData("hora");
            console.log('[' + formhora + '] Criando novo usuario');
            const insereDados = "INSERT INTO login VALUES (?, ?)";
            connection.query(insereDados, [nomeUsuario, senha_criptografada], function(error, results){
                if(error){
                    console.log('[' + formhora + ']  Erro na criação do usuario');
                    res.json(error);
                } 
                else {
                    formhora =  formData("hora");
                    console.log('[' + formhora + '] Usuario criado');
                    res.json('sucesso');}
            });
        }
        //connection.end();       
    });    
}

function autenticaUsuario(connection, res, nome, senha){
    var formhora =  formData("hora");
    console.log('[' + formhora + '] Fazendo busca do usuario no banco de dados');
    const buscaDados = "SELECT *FROM login WHERE nomeusuario = ? and senha = ?";

    connection.query(buscaDados, [nome, senha], function(error, results){
        if(error){
            formhora =  formData("hora");
            console.log('[' + formhora + ']  Erro na autenticaçao do usuario');
            res.json(error);
        }
        else if(results.length == 1){
            formhora =  formData("hora");
            console.log('[' + formhora + '] Usuario autenticado com sucesso');
            res.json('sucesso');
        } else if(results.length == 0){
            formhora =  formData("hora");
            console.log('[' + formhora + '] Usuario não existe');
            res.json('noExiste');
        }
    });
    //connection.end();
}

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
