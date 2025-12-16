# Backend API REST - Full Stack Project

Backend simple avec Express.js pour l'application Angular Full Stack Project.

## 🚀 Installation rapide

### Option 1 : Utiliser ce dossier backend-example

```bash
# 1. Allez dans le dossier backend
cd backend-example

# 2. Installez les dépendances
npm install

# 3. Démarrez le serveur
npm start
```

Le serveur sera accessible sur `http://localhost:3000`

### Option 2 : Créer votre propre backend

```bash
# 1. Créez un nouveau dossier
mkdir backend-fullstackproject
cd backend-fullstackproject

# 2. Initialisez npm
npm init -y

# 3. Installez les dépendances
npm install express cors body-parser

# 4. Copiez le fichier server.js dans ce dossier

# 5. Démarrez le serveur
node server.js
```

## 📋 Dépendances

- **express** : Framework web pour Node.js
- **cors** : Middleware pour gérer les requêtes CORS
- **body-parser** : Parser pour les données JSON

## 🔌 Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/events` | Liste tous les événements |
| `GET` | `/events?location=xxx` | Recherche par lieu |
| `GET` | `/events/:id` | Récupère un événement par ID |
| `POST` | `/events` | Crée un nouvel événement |
| `PUT` | `/events/:id` | Modifie un événement |
| `PATCH` | `/events/:id` | Mise à jour partielle (like, réservation) |
| `DELETE` | `/events/:id` | Supprime un événement |
| `GET` | `/health` | Vérifie que le serveur fonctionne |

## 📝 Format des données Event

```json
{
  "id": 1,
  "title": "Concert Rock",
  "description": "Un super concert",
  "date": "2024-12-31T20:00:00.000Z",
  "location": "Paris, Zénith",
  "price": 50,
  "organizerId": 1,
  "imageUrl": "/images/event.png",
  "nbPlaces": 100,
  "nbrLike": 10
}
```

## 🔧 Configuration

### Changer le port

Par défaut, le serveur écoute sur le port 3000. Pour changer :

```bash
# Définissez la variable d'environnement PORT
PORT=4000 node server.js

# Ou modifiez directement dans server.js
const PORT = 4000;
```

### Données persistantes

Actuellement, les données sont stockées en mémoire et seront perdues à chaque redémarrage.

Pour une persistance réelle, vous pouvez :

1. **Utiliser une base de données** (MongoDB, PostgreSQL, MySQL)
2. **Utiliser un fichier JSON** avec `fs` pour sauvegarder/charger
3. **Utiliser JSON Server** : `npm install -g json-server`

## 🧪 Tester l'API

### Avec curl

```bash
# Lister tous les événements
curl http://localhost:3000/events

# Récupérer un événement
curl http://localhost:3000/events/1

# Créer un événement
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvel événement",
    "description": "Description",
    "date": "2024-12-31",
    "location": "Paris",
    "price": 50,
    "nbPlaces": 100
  }'

# Like un événement
curl -X PATCH http://localhost:3000/events/1 \
  -H "Content-Type: application/json" \
  -d '{"nbrLike": 1}'

# Supprimer un événement
curl -X DELETE http://localhost:3000/events/1
```

### Avec Postman ou Thunder Client

Importez les endpoints dans Postman pour tester facilement.

## ⚠️ Notes importantes

- Ce backend est **uniquement pour le développement**
- Les données sont **en mémoire** et seront perdues au redémarrage
- Pour la production, utilisez une vraie base de données
- Le CORS est configuré pour `http://localhost:4200` (Angular)

## 🚀 Prochaines étapes

1. Connectez une base de données (MongoDB, PostgreSQL, etc.)
2. Ajoutez l'authentification (JWT)
3. Ajoutez la validation des données
4. Ajoutez la gestion des erreurs avancée
5. Ajoutez les logs
6. Déployez sur un serveur (Heroku, AWS, etc.)

## 📚 Ressources

- [Documentation Express](https://expressjs.com/)
- [Documentation CORS](https://github.com/expressjs/cors)
- [REST API Best Practices](https://restfulapi.net/)

