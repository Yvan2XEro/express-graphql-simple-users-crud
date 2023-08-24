# GraphQL User API

Cette API est une application Node.js utilisant Express et GraphQL pour gérer les opérations CRUD (Create, Read, Update, Delete) sur les utilisateurs. Elle utilise SQLite comme base de données pour stocker les informations des utilisateurs.

## Fonctionnalités

- Lister les utilisateurs existants.
- Ajouter un nouvel utilisateur.
- Mettre à jour les informations d'un utilisateur.
- Supprimer un utilisateur.
- Sélectionner un utilisateur par ID.

## Prérequis

- Node.js et npm doivent être installés sur votre machine.

## Installation

1. Clonez ce dépôt sur votre machine.
2. Accédez au répertoire du projet dans votre terminal.
3. Installez les dépendances en exécutant la commande `npm install`.

## Configuration de la base de données

1. Assurez-vous que vous avez `sqlite3` installé globalement (`npm install -g sqlite3`) ou localement (`npm install sqlite3`).
2. Exécutez le script SQL contenu dans `database.js` pour initialiser la base de données SQLite.

## Démarrage du serveur

1. Dans le répertoire du projet, exécutez la commande `node server.js`.
2. Le serveur démarrera et sera accessible à l'adresse `http://localhost:4000/graphql`.

## Utilisation

Vous pouvez utiliser l'interface GraphiQL intégrée pour tester les requêtes et mutations GraphQL.
