import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { User } from "../Models/user";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"


// Creation d'application express 
const app: Application = express();
// port configuration
const port = process.env.PORT || 4000;
// _____________________________ MIDDLEWARE ___________________________ //

// Cors
app.use(cors());
//configure env;
dotenv.config();
// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ____________________________ ********* ___________________________ //
// ____________________________ ROUTING ___________________________ //

// ___ Get affichage welcome
app.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
    
  });

// ___ Creation d'API utilisateur pour s'inscrire
app.post("/auth/register", async (req, res) => {
    try {
      // ** Get le donneé utilisateur depuis Body ;
      const user = req.body;
  
      // ** Déstructurer les informations de l’utilisateur;
      const { name, email, password } = user;
  
      // ** Vérifiez si l'email existe déjà dans la base de données ou non.
      // ** Importer le model utilisateur depuis '/models/user'
      const isEmailAllReadyExist = await User.findOne({
        email: email,
      });

      // ** Add a condition if the user exist we will send the response as email all ready exist
      // ** Ajout de condition si l'email est déjà utiliser, envoye de reponse email déjà utiliser
      // ** si isEmailAllReadyExist est non null
      if (isEmailAllReadyExist) {
        res.status(400).json({
          status: 400,
          message: "email déjà utiliser",
        });
         return; // arrête
      }
  
      // ** si non,créer un nouveul utilisateur
      // !! Don't save the password as plain text in db . I am saving just for demonstration.
      // ** You can use bcrypt to hash the plain password.

      // ** hacher le password en utilisant bcrypt
      let newUser;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async function (err, hash) {
          // Store hash in the database
           // creation d'utilisateur
          newUser = await User.create({
            name : name,
            email : email,
            password : hash,
          })
        });
      })
  
      // Envoyer le newUser en reponse;
      res.status(200).json({
        status: 201,
        success: true,
        message: " User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      // console the error to debug
      console.log(error);
  
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });

  // ___ Creation d'API login et implementation de JWT (Json Web Token) Authentification
  app.post("/auth/login", async (req, res) => {
    try {
      // **Get le donneé utilisateur depuis Body ;
      const user = req.body;
  
      // ** Déstructurer les informations de l’utilisateur;
      const { name,email, password } = user;
  
      // ** Vérifiez si (email/user) existe dans la base de données ou non;
      const isUserExist = await User.findOne({
        email: email,
      });
  
      // ** S’il n’y a pas d’utilisateur avec l’e-mail, nous envoyons que l’utilisateur est introuvable;
      // si isUserExist à de valeur,l'email de l'utilisateur exist => utilisateur exist
      if (!isUserExist) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return; // arrête
      }
  
      // ** Si l’utilisateur existe dans la base de données, nous vérifierons que le mot de passe est valide ou no ;
      // ** Comparez le mot de passe dans la base de données et le mot de passe dans le requete body
      
      
      // compare password avec async/await
      try {
        // comparrer password
        // isPasswordMatched is true si mdp correct
        let isPasswordMatched = await bcrypt.compare(password,isUserExist?.password)
        if (!isPasswordMatched) {
          res.status(400).json({
            status: 400,
            success: false,
            message: "wrong password",
          });
          return; // arrête
        }
      } catch (error) {
        console.log(error);
      }

      // ** if the email and password is valid create a token
      /*
      To create a token JsonWebToken (JWT) receive's 3 parameter
      Pour créer token JsonWebToken (JWT), le 3 paramètre de JsonWebToken (JWT) reçoit
      1. Payload - contient le claims ou les données que vous souhaitez inclure dans le token.
      2. Secret Key - clé sécurisée connue uniquement du serveur utilisé pour signing the token.
      3. expiration -   Paramètres supplémentaires tels que l’expiration du token ou la sélection de l’algorithme.
      */
  
      // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration
      
      // ** This is our JWT Token
      const token = jwt.sign(
        { _id: isUserExist?._id, email: isUserExist?.email },
        "YOUR_SECRET",
        {
          expiresIn: "1d",
        }
      );
  
      // send the response
      res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        token: token,
      });
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  });

// ____________________________ ********* ___________________________ //

// Listen the server
app.listen(port, async () => {  
  console.log(`🗄️  Server Fire on http:localhost//${port}`);

  // Connection à la base de donnée
  try {
    // Verifier si MONGODB_URL est définie
    if (!process.env.MONGODB_URL){
      throw new Error("variable d'environnement mongodb_url non definie");
    }
    // Si oui,connectez alors
    mongoose.connect(process.env.MONGODB_URL)
    console.log('connexion à la base de donnée ok');
  } catch (error) {
    console.log(error);
  }
  
});
