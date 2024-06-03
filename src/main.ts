// importation du module express et l'interface application pour la creation de l'application web back end  
import express , {Application} from 'express'
// importation du module mongoose pour l'interaction avec un serveur mongoDB
import mongoose from 'mongoose'
// importation du module path pour la gestion de chemin
import path from 'path'
import Routes from './Routing/Routes'

// creation d'une instance d'application avec express
const app : Application = express()
// Definition du port du serveur
const PORT = process.env.PORT || 4000


// _____________________________________ MIDDLEWARE START_____________________________________ //

// Definition des fichiers statiques
const cheminStatic = path.join(__dirname,'../public')
// Middleware pour la gestion des fichier statiques
app.use(express.static(cheminStatic))

// Middleware qui permet de parser les JSON
app.use(express.json())

// Middleware qui permet de parser les URL-ENNCODED (les form)
app.use(express.urlencoded({extended : true}))
 
// _____________________________________ MIDDLEWARE END_____________________________________ //

// _____________________________________ DATABASE START_____________________________________ //

const demarrageDB = async () =>{
    try {
        // essayer de se connecter avec le serveur de la base  de donnée
        await mongoose.connect('mongodb://localhost:27017/crud');
        console.log('connexion à la base de donnée réussi');
        
    } catch (error) {
        console.log('connexion à la base de donnée echoue : ',error)
    }
}
demarrageDB()

// _____________________________________ DATABASE END_____________________________________ //

// _____________________________________ ROUTING START_____________________________________ //

// Creation d'un instance de Route qui gére le Route principale
const routes : Routes = new Routes(app)
routes.initialisation()

// _____________________________________ ROUTING END_____________________________________ //

// _____________________________________ DEMARRAGE SERVEUR START_____________________________________ //

app.listen(PORT,() =>{
    console.log(`le serveur est demarrer sur le port \"http://locahost:${PORT}\"`);
})

// _____________________________________ DEMARRAGE SERVEUR END_____________________________________ //

