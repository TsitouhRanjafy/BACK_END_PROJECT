// Gestion de route 'modification/html'

import express, { Router,Request,Response } from "express";
import path from "path";import Modification from "../../Models/modification";
import { json } from "stream/consumers";
import Utilisateur from "../../Models/utilisateurs";
;

// Creation de l'interface modification 
interface IModificationApres  {
    id_modification : number
    nom_apres : string
    age_apres : number
    genre_apres : string
    niveau_apres : number
}

export default class ModificationHtmlRoute {
    private router : Router
    constructor (){
        this.router = express.Router()
        this.init()
    }
    private init(){
        // Gestion de route de '/modification/html/' GET pour envoyer le html de modification 
        this.router.get('/',(req : Request,res : Response) =>{
            res.sendFile(path.join(__dirname,'../../../public/modification.html'))
         })
        // Gestion de route de '/modification/html/enregistrer' GET pour envoyer le html de modification 
        this.router.post('/enregistrer',(req : Request,res : Response) =>{
            const data = req.body
            console.log('DATA :', data); 
            // Mije à jours d'utilisateur
            const update =  async (I : IModificationApres ) =>{
                try {
                    const historiqueModification = await Modification.find().sort({id_modification : -1}).limit(1) // selectionée historique pour le modifier
                    const IdHistoriqueAModification = historiqueModification[0].id // _id d'utilisateur à qui on va appliquer des modifications
                    // Mije à jour utilisateur
                    await Utilisateur.updateOne({id : {$eq : IdHistoriqueAModification}},{$set : {
                        nom : I.nom_apres,
                        age : I.age_apres,
                        genre : I.genre_apres,
                        niveau : I.niveau_apres
                    }})
                    // enregistrer le modification
                    await Modification.updateOne({id : IdHistoriqueAModification},{$set : {
                        nom_apres : I.nom_apres,
                        age_apres : I.age_apres,            
                        genre_apres : I.genre_apres,
                        niveau_apres : I.niveau_apres
                    }}) 
                } catch (error) {
                    console.log(error);
                }
            }
            update(data)
            res.redirect('/affichage.html');
         })
    }
    public getRouter() : Router {
        return this.router
    }
    
}