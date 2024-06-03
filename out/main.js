"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importation du module express et l'interface application pour la creation de l'application web back end  
const express_1 = __importDefault(require("express"));
// importation du module mongoose pour l'interaction avec un serveur mongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// importation du module path pour la gestion de chemin
const path_1 = __importDefault(require("path"));
const Routes_1 = __importDefault(require("./Routing/Routes"));
// creation d'une instance d'application avec express
const app = (0, express_1.default)();
// Definition du port du serveur
const PORT = process.env.PORT || 4000;
// _____________________________________ MIDDLEWARE START_____________________________________ //
// Definition des fichiers statiques
const cheminStatic = path_1.default.join(__dirname, '../public');
// Middleware pour la gestion des fichier statiques
app.use(express_1.default.static(cheminStatic));
// Middleware qui permet de parser les JSON
app.use(express_1.default.json());
// Middleware qui permet de parser les URL-ENNCODED (les form)
app.use(express_1.default.urlencoded({ extended: true }));
// _____________________________________ MIDDLEWARE END_____________________________________ //
// _____________________________________ DATABASE START_____________________________________ //
const demarrageDB = async () => {
    try {
        // essayer de se connecter avec le serveur de la base  de donnée
        await mongoose_1.default.connect('mongodb://localhost:27017/crud');
        console.log('connexion à la base de donnée réussi');
    }
    catch (error) {
        console.log('connexion à la base de donnée echoue : ', error);
    }
};
demarrageDB();
// _____________________________________ DATABASE END_____________________________________ //
// _____________________________________ ROUTING START_____________________________________ //
// Creation d'un instance de Route qui gére le Route principale
const routes = new Routes_1.default(app);
routes.initialisation();
// _____________________________________ ROUTING END_____________________________________ //
// _____________________________________ DEMARRAGE SERVEUR START_____________________________________ //
app.listen(PORT, () => {
    console.log(`le serveur est demarrer sur le port \"http://locahost:${PORT}\"`);
});
// _____________________________________ DEMARRAGE SERVEUR END_____________________________________ //
