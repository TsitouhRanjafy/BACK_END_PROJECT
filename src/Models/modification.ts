/**
 * Model modification pour l'enregistrement de tout l'historique de modification
 */

import { Document,Schema,model } from "mongoose";

// Creation de l'interface modification 
interface IModification extends Document {
    id : number
    id_modification : number
    nom : string
    nom_apres : string
    age : number
    age_apres : number
    genre : string
    genre_apres : string
    niveau : number
    niveau_apres : number
    
}

// Creation de Schemen utilisateur
const modificationSchema = new  Schema<IModification>({
    id : {type : Number},
    id_modification : {type : Number},
    nom : {type : String},
    nom_apres : {type : String},
    age : {type : Number},
    age_apres : {type : Number},
    genre : {type : String},
    genre_apres : {type : String},
    niveau : {type : Number},
    niveau_apres : {type : Number}
}) 

// Contruction du model utilsateur
const Modification = model<IModification>('modification',modificationSchema)

// Exportation du model 
export default Modification