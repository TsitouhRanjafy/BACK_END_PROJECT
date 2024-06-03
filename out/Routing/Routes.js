"use strict";
// ___________________ Gestion des Routes  ______________________ //
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeRoutes_1 = __importDefault(require("./Home/HomeRoutes"));
const EnregistrementRoutes_1 = __importDefault(require("./Enregistrement/EnregistrementRoutes"));
const AffichageRoutes_1 = __importDefault(require("./Affichage/AffichageRoutes"));
const ModificationRoutes_1 = __importDefault(require("./Modification/ModificationRoutes"));
// Creatoin et Exportatoin de la class qui gére le Routing de notre application 
class Routes {
    constructor(app) {
        // Assignation de l'application en enrgumment de constructeur à la propriété 
        this.rout = app;
    }
    // Methodes
    initialisation() {
        // Gestion de la route '/'
        this.rout.get('/', (req, res) => {
            res.redirect('/home');
        });
        // Gestion de route '/home'
        const homeRoute = new HomeRoutes_1.default();
        this.rout.use('/home', homeRoute.getRouter()); // Methode qui permet de recuperer qui gére le route '/home'
        // Gestion de route '/enregistrement'
        const enregistremente = new EnregistrementRoutes_1.default();
        this.rout.use('/enregistrement', enregistremente.getRouter()); // Methode qui permet de recuperer qui gére le route '/enregistrement'
        // Gestion de route '/affichage'
        const affichageRoute = new AffichageRoutes_1.default();
        this.rout.use('/affichage', affichageRoute.getRouter()); // Methode qui permet de recuperer qui gére le route '/affichage'
        // Gestion de route '/modification.html'
        const modificationRoute = new ModificationRoutes_1.default();
        this.rout.use('/modification', modificationRoute.getRouter()); // Methode qui permet de recuperer qui gére le route '/modification'
    }
}
exports.default = Routes;
