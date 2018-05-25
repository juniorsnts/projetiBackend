var fs = require('fs');
 
var obj = {
 
    getFileDb: function () {
        return  __dirname + '/db/service.json';
    },
 
    getData: function (path) {
        var db = __dirname + '/db/'+ path +'.json';
        var fileContent = fs.readFileSync(db, 'utf8');
        var fileJson = [];
        if (fileContent) {
            fileJson = JSON.parse(fileContent);
        }
        return fileJson;
    },
 
    saveData: function (fileJson,path) {
        var db = __dirname + '/db/'+ path +'.json';
        var data = JSON.stringify(fileJson);
        fs.writeFileSync(db, data, 'utf8');
        return data;
    },
 
    readData: function (path) {
        var db = __dirname + '/db/'+ path +'.json';
        var fileContent = fs.exists(db, function(exists){
                console.log("exists ",exists);
                return exists;
        });
       
       
    }
 
};
 
module.exports = obj;