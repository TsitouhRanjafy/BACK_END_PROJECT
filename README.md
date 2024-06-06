# BACK_END_PROJECT


# Comment implémenter l’authentification JWT (Json Web Token ) à l’aide de Node, Express, TypeScript ? 2024

Bienvenue dans notre tutoriel sur la construction d'une API REST avec Node.js/Express, MongoDB, et Typescrypt

Table des matières : 
 * Install les dépendances

# 1.Install les dépendances

Notre projet aura besoin d'un certain nombre de paquets npm et ci-dessous est la liste de ces paquets et une brève explication de ce que chacun de ces paquets nous aidera à réaliser.

`#ffffff fdeg` zay

**Express** : Un framework node.js qui facilite la création d'applications web.

**mongodb** : Pilote officiel MongoDB pour Node.js.

**mongoose**: Un outil de modélisation d'objets MongoDB conçu pour fonctionner dans un environnement asynchrone. Nous utiliserons la mangouste pour définir des schémas de base et interagir avec la base.

**bcrypt**: Cela nous aidera à hacher les mots de passe des utilisateurs avant de les stocker dans la base de données.

**jsonwebtoken**: Cela nous aidera à générer des jetons Web JSON pour l'authentification. Ce package vous aidera à configurer des itinéraires protégés auxquels seuls les utilisateurs connectés peuvent accéder.

**dotenv**: Cela nous aidera à charger les variables d'environnement à partir d'un .env fichier.

**nodemon**: Cela nous aidera à exécuter notre serveur en mode de développement.Nodemon réexécutera le serveur express chaque fois que nous apportons des modifications à notre code.

**cors (Cross-Origin Resource Sharing)** : C'est un mécanisme qui consiste à ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.

Maintenant que nous avons identifié les paquets essentiels pour notre projet, procédons à leur installation. Ouvrez votre terminal et assurez-vous que vous êtes toujours positionné dans le répertoire racine de votre projet. Exécutez la commande suivante:




