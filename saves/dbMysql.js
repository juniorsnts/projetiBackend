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
            return console.log("[" + formhora + "] Erro no banco de dados: " + err);
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
        },

    updateNomeUsuario: function(res, antigoNome, novoNome, senha) {
        var formhora = formData("hora");
        console.log('[' + formhora + '] Fazendo o update do usuario no banco de dados');    
        const buscaDados = "SELECT *FROM login WHERE nomeusuario = ? AND senha = ?";
        
        connection.query(buscaDados, [antigoNome, senha], function(error, results){
            if(error){
                formhora = formData("hora");
                console.log('[' + formhora + ']  Erro na autenticaçao do usuario para update');
                res.json(error);
            } 
            else if(results.length == 1){
                formhora =  formData("hora");
                console.log('[' + formhora + '] Usuario autenticado e fazendo o update do nome'); 
                //fazendo o update
                const updateDados = "UPDATE login SET nomeusuario = ? WHERE nomeusuario = ?";
                connection.query(updateDados, [novoNome, antigoNome], function(error, results){
                    if(error){
                        formhora =  formData("hora");
                        console.log('[' + formhora + ']  Erro no update do usuario');
                        res.json(error);
                    }
                    else{
                        formhora =  formData("hora");
                        console.log('[' + formhora + '] usuario atualizado');
                        res.json('updateUsuario');
                    }
                });
            }
            else if(results.length == 0){
                formhora =  formData("hora");
                console.log('[' + formhora + '] Usuario não existe no update');
            }
        });
        },

    updateSenha: function(res, nomeUsuario, senhaAntiga, novaSenha){
        var formhora = formData("hora");
        console.log('[' + formhora + '] Fazendo o update do usuario no banco de dados');    
        const buscaDados = "SELECT *FROM login WHERE nomeusuario = ? AND senha = ?";
        
        connection.query(buscaDados, [nomeUsuario, senhaAntiga], function(error, results){
            if(error){
                formhora = formData("hora");
                console.log('[' + formhora + ']  Erro na autenticaçao do usuario para update');
                res.json(error);
            } 
            else if(results.length == 1){
                formhora =  formData("hora");
                console.log('[' + formhora + '] Usuario autenticado e fazendo o update do nome'); 
                //fazendo o update
                const updateDados = "UPDATE login SET senha = ? WHERE nomeusuario = ?";
                connection.query(updateDados, [novaSenha, nomeUsuario], function(error, results){
                    if(error){
                        formhora =  formData("hora");
                        console.log('[' + formhora + ']  Erro no update da senha do usuario');
                        res.json(error);
                    }
                    else{
                        formhora =  formData("hora");
                        console.log('[' + formhora + '] senha do usuario atualizado');
                        res.json('updateSenha');
                    }
                });
            }
            else if(results.length == 0){
                formhora =  formData("hora");
                console.log('[' + formhora + '] Usuario não existe no update da senha');
            }
        });        
    }
};
 
module.exports = obj;