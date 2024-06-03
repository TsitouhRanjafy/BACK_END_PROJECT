"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Creation de Schemen utilisateur
const modificationApresSchema = new mongoose_1.Schema({
    nom_apres: { type: String },
    age_apres: { type: Number },
    genre_apres: { type: String },
    niveau_apres: { type: Number }
});
// Contruction du model utilsateur
const ModificationApres = (0, mongoose_1.model)('modification', modificationApresSchema);
// Exportation du model 
exports.default = ModificationApres;
