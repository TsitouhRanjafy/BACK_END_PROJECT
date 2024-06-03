"use strict";
/**
 * Model modification pour l'enregistrement de tout l'historique de modification
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creation de Schemen utilisateur
const modificationSchema = new mongoose_1.Schema({
    id: { type: Number },
    id_modification: { type: Number },
    nom: { type: String },
    nom_apres: { type: String },
    age: { type: Number },
    age_apres: { type: Number },
    genre: { type: String },
    genre_apres: { type: String },
    niveau: { type: Number },
    niveau_apres: { type: Number }
});
// Contruction du model utilsateur
const Modification = (0, mongoose_1.model)('modification', modificationSchema);
// Exportation du model 
exports.default = Modification;
