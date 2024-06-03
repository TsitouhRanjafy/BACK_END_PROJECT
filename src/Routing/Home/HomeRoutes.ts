// Importation de la fonction Router et les Interfaces, Router, Request, Response
import express, { Router,Request,Response } from "express";

// Importation du module path pour la gestion des chemins 
import path from "path";

// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
export default class HomeRoutes{
    // Propriété 
    private router : Router

    // constructor 
    constructor (){
        this.router = express.Router()
        this.initialisation()
    }

    // Methode
    private initialisation(){
        // Gestion de la route '/home/'
        this.router.get('/',(req : Request,res : Response) =>{
            // Envoye du fichier statique
            console.log("   - home started");
            res.sendFile(path.join(__dirname,'../../../public/home.html'))
        })
    }
    
    public getRouter() : Router {
        return this.router
    }
    
}