"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importation 
const mongoose_1 = require("mongoose");
// Creation de Schemen utilisateur
const utilisateurSchema = new mongoose_1.Schema({
    id: { type: Number },
    nom: { type: String },
    age: { type: Number },
    genre: { type: String },
    niveau: { type: Number }
});
// Contruction du model utilsateur
const Utilisateur = (0, mongoose_1.model)('utilisateur', utilisateurSchema);
// Exportation du model 
exports.default = Utilisateur;
