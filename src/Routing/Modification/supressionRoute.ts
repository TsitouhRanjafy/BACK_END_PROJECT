// Gestion de route '/affichage/suprimer'
import express, { Router , Request , Response} from "express";
import Utilisateur from "../../Models/utilisateurs";

export default class SupressionRoute {
    private router : Router
    constructor (){
        this.router = express.Router()
        this.init()
    }
    private init(){
        // Gestion de route pour '/affichage/suprimer/'
        this.router.post('/',(req : Request,res :Response) =>{
            const supressionUtilisateurById = async (id : Request) =>{
                try {
                    await Utilisateur.deleteOne({id : {$eq : id.query.id}}) // c'est un query parce que c'etait un variable en paramétre de fetch()
                } catch (error) {
                    console.log(error);
                }
            }
            supressionUtilisateurById(req)
        })
    }
    
    public getRouter() : Router {
        return this.router
    }
    
}