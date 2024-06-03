"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Gestion de route '/affichage/suprimer'
const express_1 = __importDefault(require("express"));
const utilisateurs_1 = __importDefault(require("../../Models/utilisateurs"));
class SupressionRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        // Gestion de route pour '/affichage/suprimer/'
        this.router.post('/', (req, res) => {
            const supressionUtilisateurById = async (id) => {
                try {
                    await utilisateurs_1.default.deleteOne({ id: { $eq: id.query.id } }); // c'est un query parce que c'etait un variable en paramétre de fetch()
                }
                catch (error) {
                    console.log(error);
                }
            };
            supressionUtilisateurById(req);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = SupressionRoute;
