// ___________________ Gestion des Routes  ______________________ //

// importation des interface , Request, Response dans express

import { Application,Request,Response, Router } from "express";
import HomeRoutes from "./Home/HomeRoutes";
import EnregistrementRoutes from "./Enregistrement/EnregistrementRoutes";
import AffichageRoutes from "./Affichage/AffichageRoutes";
import ModificationRoutes from "./Modification/ModificationRoutes";

// Creatoin et Exportatoin de la class qui gére le Routing de notre application 
class Routes {
    // Propriété
    private rout : Application
    constructor (app : Application){
        // Assignation de l'application en enrgumment de constructeur à la propriété 
        this.rout = app
    }

    // Methodes
    public initialisation(){
        // Gestion de la route '/'
        this.rout.get('/',(req : Request, res : Response) =>{
            res.redirect('/home')
        })

        // Gestion de route '/home'
        const homeRoute : HomeRoutes = new HomeRoutes()
        this.rout.use('/home',homeRoute.getRouter()) // Methode qui permet de recuperer qui gére le route '/home'

        // Gestion de route '/enregistrement'
        const enregistremente : EnregistrementRoutes = new EnregistrementRoutes()
        this.rout.use('/enregistrement',enregistremente.getRouter()) // Methode qui permet de recuperer qui gére le route '/enregistrement'

        // Gestion de route '/affichage'
        const affichageRoute : AffichageRoutes = new AffichageRoutes()
        this.rout.use('/affichage',affichageRoute.getRouter()) // Methode qui permet de recuperer qui gére le route '/affichage'

        // Gestion de route '/modification.html'
        const modificationRoute : ModificationRoutes = new ModificationRoutes()
        this.rout.use('/modification',modificationRoute.getRouter()) // Methode qui permet de recuperer qui gére le route '/modification'

    }

} 

export default Routes
