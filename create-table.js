
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user:'projeti',
    password:'gerico14599',
    database: 'server_sensor'
});

connection.connect(function(err){
    if(err){
        return console.log(err);
    }else{
        console.log("conectou!");
        createTable(connection);
    }
   
});

function createTable(conn){

    const sql = "CREATE TABLE IF NOT EXISTS Dados (\n"+
                "ID int NOT NULL AUTO_INCREMENT, \n"+
                "Nome varchar(150) NOT NULL, \n"+
                "PRIMARY KEY (ID) \n"+
                ");" ;

    conn.query(sql, function(error,results, fields){
        if(error){
            return console.log(error);
        }else{
            console.log("criou a tabela!");
            addRows(conn);
        }
    });
}

function addRows(conn){
    const sql = "INSERT INTO dados(Nome) VALUES ?";
    const values = [
          ['teste1'],
          ['teste1'],
          ['teste3']
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros!');
            conn.end();//fecha a conexão
        });
  }