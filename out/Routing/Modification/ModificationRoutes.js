"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Gestion de route pour la modification 
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const modification_1 = __importDefault(require("../../Models/modification"));
const ModificationRoutesHtml_1 = __importDefault(require("./ModificationRoutesHtml"));
class ModificationRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initilisation();
    }
    initilisation() {
        // Gestion de route de '/modification/' POST
        this.router.post('/', (req, res) => {
            console.log("   - modification started");
            // Enregistrement de l'utilisateur à modifier dans historique de modification 
            const aModifier = async (U) => {
                try {
                    const utilisateurAModifier = new modification_1.default(donneeAModifier);
                    await utilisateurAModifier.save(); // enregistrer l'utilisateur à qui on va appliquer des modifications dans le base de donnée historique de modification
                    res.sendFile(path_1.default.join(__dirname, '../../../public/modification.html')); // html pour editer l'element 
                }
                catch (error) {
                    console.log('Erreur sur l\'enregistrement de utilisateur à modifier', error);
                }
            };
            let donneeAModifier = req.body; // receuille de l'objet utilisateur à qui on va appliquer des modifications depuis affichage 
            // Gestion de ID pour le modification
            const caculIDMOD = async () => {
                donneeAModifier.id_modification = await modification_1.default.countDocuments() + 1; // insertion de id de modification
                aModifier(donneeAModifier);
            };
            caculIDMOD();
        });
        // Gestion de route de '/modification/' GET pour envoyer le donnée à modifier
        this.router.get('/', (req, res) => {
            console.log("   - modified started");
            const aModifier = async () => {
                try {
                    const historiqueModification = await modification_1.default.find().sort({ id_modification: -1 }).limit(1);
                    res.json(historiqueModification);
                }
                catch (error) {
                    console.log(error);
                }
            };
            aModifier();
        });
        // Gestion de route de '/modification/html' GET pour envoyer le html de modification 
        const modificationHtmlRoute = new ModificationRoutesHtml_1.default();
        this.router.use('/html', modificationHtmlRoute.getRouter());
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ModificationRoutes;
