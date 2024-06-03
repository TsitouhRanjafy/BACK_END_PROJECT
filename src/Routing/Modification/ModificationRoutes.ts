// Gestion de route pour la modification 
import express, { Router ,Request,Response} from "express";
import path from "path";
import Modification from "../../Models/modification";
import ModificationHtmlRoute from "./ModificationRoutesHtml";


interface IModification {
    id : number
    nom : string
    age : number
    genre : string
    niveau : number
}

export default class ModificationRoutes {
    private router : Router;
    constructor() {
        this.router = express.Router()
        this.initilisation()
    }

    private initilisation (){
        // Gestion de route de '/modification/' POST
        this.router.post('/',(req : Request,res : Response) =>{
            console.log("   - modification started");
            // Enregistrement de l'utilisateur à modifier dans historique de modification 
            const aModifier = async (U : IModification) =>{
                try {
                    const utilisateurAModifier = new Modification(donneeAModifier)                    
                    await utilisateurAModifier.save(); // enregistrer l'utilisateur à qui on va appliquer des modifications dans le base de donnée historique de modification
                    res.sendFile(path.join(__dirname,'../../../public/modification.html')) // html pour editer l'element 
                } catch (error) {
                    console.log('Erreur sur l\'enregistrement de utilisateur à modifier',error);
                }
            }
            let donneeAModifier = req.body // receuille de l'objet utilisateur à qui on va appliquer des modifications depuis affichage 
            // Gestion de ID pour le modification
            const caculIDMOD = async () =>{
                donneeAModifier.id_modification = await Modification.countDocuments() + 1 // insertion de id de modification
                aModifier(donneeAModifier)
            }
            caculIDMOD()
        })

        // Gestion de route de '/modification/' GET pour envoyer le donnée à modifier
        this.router.get('/',(req : Request,res : Response) =>{
            console.log("   - modified started");
            const aModifier = async () =>{
                try {
                    const historiqueModification = await Modification.find().sort({id_modification : -1}).limit(1)
                    res.json(historiqueModification);
                } catch (error) {
                    console.log(error);
                }
            }
            aModifier()
        })

        // Gestion de route de '/modification/html' GET pour envoyer le html de modification 
        const modificationHtmlRoute : ModificationHtmlRoute = new ModificationHtmlRoute()
        this.router.use('/html',modificationHtmlRoute.getRouter())   
    }
    
    public getRouter() : Router {
        return this.router
    }
    
}