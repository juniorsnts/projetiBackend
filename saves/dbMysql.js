const formData = require('../formData');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'server_sensor'
});

var obj = {
 
    connect: function () {
        var formhora =  formData("hora");
        connection.connect(function(err){
        if(err){
            formhora =  formData("hora");
            return console.log("[" + formhora + "] Erro no banco de dados");
        }else{
            console.log("[" + formhora + "] Banco de dados conectado");
        }
    });
    },
 
    cadastroNovoUsuario: function (res, nomeUsuario, senha_criptografada) {
        var formhora =  formData("hora");
        const buscaDados = "SELECT nomeusuario FROM login WHERE nomeusuario = ?";
        connection.query(buscaDados, [nomeUsuario] , function(error, results){
            if(error){
                res.json(error);
            } else if(results.length == 1){
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
    },
 
    autenticaUsuario: function (res, nome, senha) {
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
};
 
module.exports = obj;