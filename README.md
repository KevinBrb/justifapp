# Une application qui justifie votre texte !

:warning: **Cette application n'est pas disponible avec une interface graphique, seul le traitement back est fonctionnel. Pour tester l'application, il vous faudra posséder un utilitaire de type [Postman](https://www.postman.com/downloads/ "Télécharger Postman") ou [Insomnia](https://insomnia.rest/download "Télécharger Insomnia")**

## Technologies de l'application

Cette application est réalisé avec les technologies suivantes :
* NodeJS,
* MongoDB,
* Express

## MVP

Catte application vous permmettra :
* D'authentifier un utilisateur via son adresse email,
* De créer un token avec une durée de vie de 24h
* De justifier un texte pouvant aller jusqu'à 80000 mots toutes les 24h pour la partie gratuite de l'application

## Démarrage de l'application

Afin de pouvoir faire tourner cette application, il faut au préalable installer et configurer si nécessaire les outils suivants : 

* NodeJS et le manager de pacquet npm
* MongoDB

:warning: **Il faudra aussi prévoir un fichier ".env" avec vos informations de connexion à votre base de donnée mongo, un fichier exemple est disponible dans ce dossier.**

## Côté back

Cloner ce repo : 

```shell
git clone https://github.com/KevinBrb/pangolin.git
```

A la racine du dossier : 

```shell
npm install
```

Installer nodemon : 

```shell
npm install nodemon
```

Pour démarrer le server :

```shell
npm start
```

## Côté front

Se déplacer dans le dossier Angular :

```shell
cd .\pangolin-app\
```

Installation des paquets liés à Angular :

```shell
npm install
```

Démarrer l'application :

```shell
ng serve --open
```

## Import d'un jeu de données

Si vous souhaitez importer des données de tests : 

```shell
node ./data/import.js
```

:warning: **Attention à bien modifier le .env ainsi que la ligne 3 du fichier app/models/User.js pour le nom de la collection**

## Quelques tests

J'ai mis en place quelques tests unitaires pour la forme ! Pour les lancer, exécuter cette commande :

```shell
npm run test
```