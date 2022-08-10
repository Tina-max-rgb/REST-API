const express = require ("express");
const { connecter } = require("./bd/connect");
const routeUtilisateur = require("./route/utilisateur");
const app = express();
app.use(express.urlencoded( {extended : true}));
app.use(express.json());
app.use("/api/v", routeUtilisateur);
connecter("", (erreur) => { 
    if(erreur){
        console.log("erreur de connexion à la base de données");
        process.exit(-1);
    }else{
        console.log("connexion reussie");
        app.listen(3000);
console.log("Attente de requéte au port 3000");
    }
})
