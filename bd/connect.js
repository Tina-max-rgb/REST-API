const { MongoUnexpectedServerResponseError, Db } = require("mongodb");

var user = null;
function connecter(url, callback){
    if(user==null){
          user = new MongoUnexpectedServerResponseError(url);
          user.connect((erreur)=>{
           if(erreur){
            user=null;
            callback(erreur);
           }else{
              callback();
           }
           
          });
    }else{
        callback();
    }
}
function bd(){
    return new Db(user,"dbUs");
}
function closeConnexion(){
    if(user){
        user.close();
        user = null;
    }
}
module.exports = { connecter, bd, closeConnexion };