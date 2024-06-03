"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation de la fonction Router et les Interfaces, Router, Request, Response
const express_1 = __importDefault(require("express"));
const utilisateurs_1 = __importDefault(require("../../Models/utilisateurs"));
const supressionRoute_1 = __importDefault(require("../Modification/supressionRoute"));
// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
class AffichageRoutes {
    // constructor 
    constructor() {
        this.router = express_1.default.Router();
        this.initialisation();
    }
    // Methode
    initialisation() {
        // Gestion de la route '/affichage/' GET
        this.router.get('/', (req, res) => {
            const affichage = async () => {
                try {
                    const utilisateur = await utilisateurs_1.default.find(); // Selectionnée tout les udonnées
                    console.log("   - affichage started");
                    res.status(200).json(utilisateur); // retourne en json les données
                }
                catch (error) {
                    res.status(500).json(error);
                }
            };
            affichage();
        });
        // Gestion de route '/affichage/suprimer' POST 
        const supressionRoute = new supressionRoute_1.default();
        this.router.use('/suprimer', supressionRoute.getRouter());
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AffichageRoutes;
