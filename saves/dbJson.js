var fs = require('fs');
const formData = require('../formData');
 
var obj = {
 
    getFileDb: function (path) {
        return  __dirname + '/../db/'+ path +'.json';
    },
 
    getData: function (path) {
        var db = obj.getFileDb(path);
        var fileContent = fs.readFileSync(db, 'utf8');
        var fileJson = [];
        if (fileContent) {
            fileJson = JSON.parse(fileContent);
        }
        return fileJson;
    },
 
    saveData: function (fileJson,path) {
        var db = obj.getFileDb(path);
        var data = JSON.stringify(fileJson);
        fs.writeFileSync(db, data, 'utf8');
        return data;
    },
 
    readData: function (path) {
        var db = obj.getFileDb(path);
        var fileContent = fs.exists(db, function(exists){
                console.log("exists ",exists);
                return exists;
        });
    
    },
 
    enviarbd: function (formdata,valores,res) {
        var local = obj.getFileDb(formdata);
        var fileContent = fs.exists(local, function(exists){
            if(exists){
                formhora =  formData("hora");
                console.log("[" + formhora + "] O arquivo já existe");
                formhora =  formData("hora");
                console.log("[" + formhora + "] Adicionando informações no arquivo: " + formdata + ".json");
                var fileJson = obj.getData(formdata);
                fileJson.push(valores);
                obj.saveData(fileJson,formdata);
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
                obj.saveData(valores,formdata);
                formhora =  formData("hora");
                console.log("[" + formhora + "] Arquivo (" + formdata + ".json ) Criado");
                res.json("newDados");
            }
            });
    },

    receberionic: function (data,res){
        var local = obj.getFileDb(data);
        var fileContent = fs.exists(local, function(exists){
            if(exists){
                formhora =  formData("hora");
                console.log("[" + formhora + "] o arquivo existe");
                var arquivoJson = obj.getData(data);
                res.json(arquivoJson);
            }else{
                formhora =  formData("hora");
                console.log("[" + formhora + "] o arquivo nao existe");
                res.json("noexiste");
            }
        });
    }

 
};
 
module.exports = obj;