// Importation de la fonction Router et les Interfaces, Router, Request, Response
import express, { Router,Request,Response } from "express";

// Importation du module path pour la gestion des chemins 
import path from "path";
import Utilisateur from "../../Models/utilisateurs";
import SupressionRoute from "../Modification/supressionRoute";

// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
export default class AffichageRoutes{
    // Propriété 
    private router : Router

    // constructor 
    constructor (){
        this.router = express.Router()
        this.initialisation()
    }

    // Methode
    private initialisation(){
        // Gestion de la route '/affichage/' GET
        this.router.get('/',(req : Request,res : Response) =>{
            const affichage = async () =>{ // Fonction qui asynchrone qui retourne le JSON de tout l'utilisateur 
                try {
                    const utilisateur = await Utilisateur.find() // Selectionnée tout les udonnées
                    console.log("   - affichage started");
                    res.status(200).json(utilisateur) // retourne en json les données
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            affichage()
        })
        // Gestion de route '/affichage/suprimer' POST 
        const supressionRoute : SupressionRoute = new SupressionRoute()
        this.router.use('/suprimer',supressionRoute.getRouter())
    }
    public getRouter() : Router {
        return this.router
    }
    
}