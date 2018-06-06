const express = require('express');
const formData = require('./formData');
const app = require('express')();
const bodyParser = require('body-parser');
const dbMysql = require('./saves/dbMysql.js');
const socket = require('./socket/socket-io.js');
const cripto = require('./cripto/criptografia.js');
var port = process.env.PORT || 3398; //porta padrão
var dbJson = require('./saves/dbJson.js');
let http = require('http').Server(app);

dbMysql.connect();

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

//rota de cadastro de novo usuario
router.post('/inserirUsuario', (req, res)=>{
    var formhora =  formData("hora");
    console.log('[' + formhora + '] Requisição para inserir usuario via POST');    
    const nomeUsuario = req.body.nomeUsuario;
    const senha_criptografada = cripto.criptografar(req.body.senha);
    dbMysql.cadastroNovoUsuario(res,nomeUsuario,senha_criptografada);    
});
//rota para autenticar usuario cadastrado
router.post('/autenticaUsuario', (req, res) => {
    var formhora =  formData("hora");
    console.log('[' + formhora + '] Requisição para autenticar usuario via POST');
    const nome = req.body.nome;
    const senha = cripto.criptografar(req.body.senha);
    dbMysql.autenticaUsuario(res, nome, senha); 
});

router.post('/updateUsuario', (req, res) =>{
    var formhora = formData("hora");
    console.log('[' + formhora + '] Requisiçao para update de usuario');
    const antigoNome = req.body.antigoNome;
    const novoNome = req.body.novoNome;
    const senha = req.body.senha;
    dbMysql.updateNomeUsuario(res, antigoNome, novoNome, senha);
});

router.post('/updateSenha', (req, res) =>{
    var formhora = formData("hora");
    console.log('[' + formhora + '] Requisiçao para update de usuario');
    const nomeUsuario = req.body.nomeUsuario;
    const senhaAntiga = req.body.senhaAntiga;
    const novaSenha = req.body.novaSenha;
    dbMysql.updateSenha(res, nomeUsuario, senhaAntiga, novaSenha);
});

router.post('/enviarbd', (req, res) => {
    let valores = req.body;
    socket.emit(valores);
    var formhora =  formData("hora"); 
    var formdata = formData("data");
    console.log('[' + formhora + '] Requisição para salvar informações via POST');
    dbJson.enviarbd(formdata,valores,res);
});

router.get('/receberionic', (req, res) => {
    var formdata =  formData("data"); 
    var data;
    if(req.query.atual == "true"){
        data = formdata;
    }else{
        if(req.query.atual == "false"){
            data = req.query.data;
        }else{
            data = "0:0:0";
        }
    } 
    var formhora =  formData("hora"); 
    console.log("[" + formhora + "] Requisição de informações do dia: ", data);
    formhora =  formData("hora");
    console.log("[" + formhora + "] requisitado pelo ip: ",req.ip);
    dbJson.receberionic(data,res);
});

//conexao com socket
socket.connect(http);

app.use('/', router);
//inicia o servidor
http.listen(port, function(){
    var formhora =  formData("hora");
    console.log('[' + formhora + '] listening on port ' + port);
});