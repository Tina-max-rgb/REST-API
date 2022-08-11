const { Utilisateur } = require("../model/utilisateur")
const client = require("../bd/connect");
const ajouterUtilisateur = async(req, res)=>{
    try{
        let utilisateur = new Utilisateur(
            req.body.noms, 
            req.body.adresse, 
            req.body.telephone);
        let result = await client
        .bd()
        .collection("utilisateurs")
        .insertOne(utilisateur);
        res.status(200).json(result);
    }catch (error){
    console.log(error);
    res.status(500).json(error);
    }
};

const getToutUtilisateurs = async (req, res)=>{
    try{
     let cursor = user.bd().collection("utilisateurs").find();
     let result = await cursor.toArray();
     if(result.length>0){
        res.status(200).json(result);
     } else {
        res.status(204).json({msg : "Aucun utilisateur trouvé" });
     }
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUtilisateur = async (req, res)=>{
    try{
     let id = new ObjectId(req.params.id);
     let cursor = user.bd().collection("utilisateurs").find({_id : id});
     let result = await cursor.toArray();
     if(result.length>0){
        res.status(200).json(result[0]);
     } else {
        res.status(204).json({ msg : "Cet utilisateur n'existe pas" });
     }
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const modifierUtilisateur = async (req, res)=>{
    try{
        let id = new ObjectId(req.params.id);
        let nNoms = req.body.noms;
        let nAdresse = req.body.adresse;
        let nTelephone = req.body.telephone;
        let result = await user
        .bd()
        .collection("utilisateurs")
        .updateOne(
            {_id : id}, 
            { $set : { noms : nNoms, adresse : nAdresse, telephone : nTelephone } }
            );
            if(result.modifierCount ==1){
                res.status(200).json({msg : "Modification reussie"});
            }else{
                res.status(404).json({ msg : "Cet utilisateur n'existe pas" });
            }
           
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    };

    const supprimerUtilisateur = async (req, res)=> {
        try{
            let id = new ObjectId(req.params.id);
            
            let result = await user
            .bd()
            .collection("utilisateurs")
            .deleteteOne(
                { _id : id });
                if (result.deleteCount==1){
                    res.status(200).json({msg : "suppression reussie"});
                }else{
                    res.status(404).json({ msg : "Cet utilisateur n'existe pas" }); 
                }
               
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
        };
    
module.exports = 
{ ajouterUtilisateur,
  getToutUtilisateurs, 
  getUtilisateur, 
  modifierUtilisateur, 
  supprimerUtilisateur };