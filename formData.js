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

module.exports = formData;