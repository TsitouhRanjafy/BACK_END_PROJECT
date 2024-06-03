// Importation de la fonction Router et les Interfaces, Router, Request, Response
import express, { Router,Request,Response } from "express";

// Importation du module path pour la gestion des chemins 
import path from "path";
import Utilisateur from "../../Models/utilisateurs";

// Creation interface utilisateur
interface IUtilisateur {
    id : number
    nom : string
    age : number
    genre : string
    niveau : number
}

// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
export default class EnregistrementRoutes{
    // Propriété 
    private router : Router

    // constructor 
    constructor (){
        this.router = express.Router()
        this.initialisation()
    }

    // Methode
    private initialisation(){
        // Gestion de la route '/enregistrement/'
        this.router.get('/',(req : Request,res : Response) =>{
            console.log("   - enregistrement started");
            res.sendFile(path.join(__dirname,'../../../public/enregistrement.html')) // Envoye du fichier statique
        })

        // Gestion de  route '/addUtilisateur'
        this.router.post('/addUtilisateur',(req : Request,res : Response) =>{
            console.log("   - utilisateur enregistrer");
            const enregistrement= async (U : IUtilisateur) =>{ // fonction asynchrone qui enregistre le model Utilisateur dans le base de donnée
                try {
                    const utilisateur = new Utilisateur(U) // Un model utilisateur minana an'ilay interface (JSON ngamba ny interface tonga avy any ) tonga avy any am front 
                    await utilisateur.save() // modele no afaka sauvena 
                    res.status(201).redirect('/affichage.html')
                } catch (error) {
                    console.log(error);
                    res.status(500).json(error)
                    
                }
            }
            // getion de ID utilisateur
            const data = req.body // JSON qui viens du front (ou interface utilisateur)
            const caculID = async () =>{   
                // Insertion de id et incrementation 
                let arrayLastId = await Utilisateur.find({},{id : 1}).sort({id : -1}).limit(1) 
                if (arrayLastId.length != 0){
                    data.id = arrayLastId[0].id + 1
                }else{
                    data.id = 1;
                }
                // data.id = arrayLastId[0].id + 1;
                enregistrement(data) 
            }
            caculID()
 
        })
    }
    
    public getRouter() : Router {
        return this.router
    }
    
}