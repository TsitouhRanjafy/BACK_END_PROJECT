"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation de la fonction Router et les Interfaces, Router, Request, Response
const express_1 = __importDefault(require("express"));
// Importation du module path pour la gestion des chemins 
const path_1 = __importDefault(require("path"));
// Creation et Importation de la class HomeRoutes qui permet de gerer le Routing '/home'
class HomeRoutes {
    // constructor 
    constructor() {
        this.router = express_1.default.Router();
        this.initialisation();
    }
    // Methode
    initialisation() {
        // Gestion de la route '/home/'
        this.router.get('/', (req, res) => {
            // Envoye du fichier statique
            console.log("   - home started");
            res.sendFile(path_1.default.join(__dirname, '../../../public/home.html'));
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = HomeRoutes;
