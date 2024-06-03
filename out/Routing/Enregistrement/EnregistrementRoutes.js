"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation de la fonction Router et les Interfaces, Router, Request, Response
const express_1 = __importDefault(require("express"));
// Importation du module path pour la gestion des chemins 
const path_1 = __importDefault(require("path"));
const utilisateurs_1 = __importDefault(require("../../Models/utilisateurs"));
// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
class EnregistrementRoutes {
    // constructor 
    constructor() {
        this.router = express_1.default.Router();
        this.initialisation();
    }
    // Methode
    initialisation() {
        // Gestion de la route '/enregistrement/'
        this.router.get('/', (req, res) => {
            console.log("   - enregistrement started");
            res.sendFile(path_1.default.join(__dirname, '../../../public/enregistrement.html')); // Envoye du fichier statique
        });
        // Gestion de  route '/addUtilisateur'
        this.router.post('/addUtilisateur', (req, res) => {
            console.log("   - utilisateur enregistrer");
            const enregistrement = async (U) => {
                try {
                    const utilisateur = new utilisateurs_1.default(U); // Un model utilisateur minana an'ilay interface (JSON ngamba ny interface tonga avy any ) tonga avy any am front 
                    await utilisateur.save(); // modele no afaka sauvena 
                    res.status(201).redirect('/affichage.html');
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json(error);
                }
            };
            // getion de ID utilisateur
            const data = req.body; // JSON qui viens du front (ou interface utilisateur)
            const caculID = async () => {
                // Insertion de id et incrementation 
                let arrayLastId = await utilisateurs_1.default.find({}, { id: 1 }).sort({ id: -1 }).limit(1);
                if (arrayLastId.length != 0) {
                    data.id = arrayLastId[0].id + 1;
                }
                else {
                    data.id = 1;
                }
                // data.id = arrayLastId[0].id + 1;
                enregistrement(data);
            };
            caculID();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = EnregistrementRoutes;
