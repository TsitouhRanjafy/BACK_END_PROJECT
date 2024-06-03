// Importation 
import { Document,Schema,model } from "mongoose";

// Creation de l'interface utilisateur 
interface IUtilisateur extends Document {
    id : number
    nom : string
    age : number
    genre : string
    niveau : number
}

// Creation de Schemen utilisateur
const utilisateurSchema = new  Schema<IUtilisateur>({
    id : {type : Number},
    nom : {type : String},
    age : {type : Number},
    genre : {type : String},
    niveau : {type : Number}
}) 

// Contruction du model utilsateur
const Utilisateur = model<IUtilisateur>('utilisateur',utilisateurSchema)

// Exportation du model 
export default Utilisateur
