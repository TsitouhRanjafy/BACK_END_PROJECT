"use strict";
// Gestion de route 'modification/html'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const modification_1 = __importDefault(require("../../Models/modification"));
const utilisateurs_1 = __importDefault(require("../../Models/utilisateurs"));
;
class ModificationHtmlRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        // Gestion de route de '/modification/html/' GET pour envoyer le html de modification 
        this.router.get('/', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../../public/modification.html'));
        });
        // Gestion de route de '/modification/html/enregistrer' GET pour envoyer le html de modification 
        this.router.post('/enregistrer', (req, res) => {
            const data = req.body;
            console.log('DATA :', data);
            // Mije à jours d'utilisateur
            const update = async (I) => {
                try {
                    const historiqueModification = await modification_1.default.find().sort({ id_modification: -1 }).limit(1); // selectionée historique pour le modifier
                    const IdHistoriqueAModification = historiqueModification[0].id; // _id d'utilisateur à qui on va appliquer des modifications
                    // Mije à jour utilisateur
                    await utilisateurs_1.default.updateOne({ id: { $eq: IdHistoriqueAModification } }, { $set: {
                            nom: I.nom_apres,
                            age: I.age_apres,
                            genre: I.genre_apres,
                            niveau: I.niveau_apres
                        } });
                    // enregistrer le modification
                    await modification_1.default.updateOne({ id: IdHistoriqueAModification }, { $set: {
                            nom_apres: I.nom_apres,
                            age_apres: I.age_apres,
                            genre_apres: I.genre_apres,
                            niveau_apres: I.niveau_apres
                        } });
                }
                catch (error) {
                    console.log(error);
                }
            };
            update(data);
            res.redirect('/affichage.html');
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ModificationHtmlRoute;
