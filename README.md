# Full Stack Project - Application Angular pour la gestion d'événements

Application complète full stack Angular pour la gestion d'événements, d'utilisateurs et de tickets. Ce projet comprend un frontend Angular et nécessite un backend API REST pour fonctionner.

## 🚀 Démarrage rapide

**Vous voulez démarrer rapidement ?** Consultez le [GUIDE-DEMARRAGE-RAPIDE.md](GUIDE-DEMARRAGE-RAPIDE.md) pour une installation en 3 étapes !

Pour les détails complets, continuez la lecture de ce fichier.

## 📋 Table des matières

- [🚀 Démarrage rapide](#-démarrage-rapide)
- [Aperçu du projet](#aperçu-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration Backend](#configuration-backend)
- [Démarrage du projet](#démarrage-du-projet)
- [Structure du projet](#structure-du-projet)
- [API Endpoints requis](#api-endpoints-requis)
- [Fonctionnalités](#fonctionnalités)
- [Scripts disponibles](#scripts-disponibles)
- [Tests](#tests)
- [Dépannage](#dépannage)

## 🎯 Aperçu du projet

Cette application Angular permet de :
- ✅ Gérer des événements (CRUD complet)
- ✅ Rechercher et filtrer des événements
- ✅ Gérer les utilisateurs
- ✅ Système de likes pour les événements
- ✅ Réservation de places
- ✅ Formulaires réactifs avec validation
- ✅ Pipes et directives personnalisés
- ✅ Design moderne avec Bootstrap

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18.x ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (inclus avec Node.js) ou **yarn**
- **Angular CLI** (sera installé globalement ou via npx)
- **Un backend API REST** (voir section Configuration Backend)

### Vérification de l'installation

```bash
node --version
npm --version
```

### Installation d'Angular CLI (si nécessaire)

```bash
npm install -g @angular/cli
```

## 📦 Installation

1. **Cloner ou naviguer vers le répertoire du projet**

```bash
cd AngularTraining  # ou votre répertoire de projet
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Vérifier que l'installation s'est bien passée**

```bash
ng version
```

## 🚀 Configuration Backend

Le frontend Angular nécessite un backend API REST qui écoute sur `http://localhost:3000/events/`.

### Option 1 : Utiliser un backend Node.js/Express existant

Si vous avez déjà un backend, assurez-vous qu'il :
- Écoute sur le port 3000
- Accepte les requêtes CORS depuis `http://localhost:4200`
- Implémente les endpoints listés ci-dessous

### Option 2 : Utiliser le backend exemple fourni

Un backend exemple complet est fourni dans le dossier `backend-example/` :

```bash
cd backend-example
npm install
npm start
```

Consultez le fichier `backend-example/README-BACKEND.md` pour plus de détails.

### Option 3 : Créer un backend simple avec Node.js/Express

Créez un nouveau dossier pour votre backend (par exemple, à côté du dossier Angular) :

```bash
mkdir backend-fullstackproject
cd backend-fullstackproject
npm init -y
npm install express cors body-parser
```

**Exemple de serveur backend (`server.js`) :**

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(body-parser.json());

// Base de données en mémoire (remplacez par une vraie base de données)
let events = [
  {
    id: 1,
    title: "Concert Rock",
    description: "Un super concert de rock",
    date: new Date("2024-12-31"),
    location: "Paris",
    price: 50,
    organizerId: 1,
    imageUrl: "/images/event.png",
    nbPlaces: 100,
    nbrLike: 10
  }
];

// Routes Events

// GET /events - Récupérer tous les événements
app.get('/events', (req, res) => {
  const { location } = req.query;
  let filteredEvents = events;
  
  if (location) {
    filteredEvents = events.filter(e => 
      e.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  res.json(filteredEvents);
});

// GET /events/:id - Récupérer un événement par ID
app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  res.json(event);
});

// POST /events - Créer un événement
app.post('/events', (req, res) => {
  const newEvent = {
    id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
    ...req.body,
    date: new Date(req.body.date),
    nbrLike: req.body.nbrLike || 0
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT /events/:id - Modifier un événement
app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  events[index] = { ...events[index], ...req.body, id };
  res.json(events[index]);
});

// PATCH /events/:id - Mettre à jour partiellement un événement
app.patch('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  if (req.body.nbrLike !== undefined) {
    events[index].nbrLike = (events[index].nbrLike || 0) + req.body.nbrLike;
  }
  
  if (req.body.nbPlaces !== undefined) {
    events[index].nbPlaces = Math.max(0, events[index].nbPlaces + req.body.nbPlaces);
  }
  
  res.json(events[index]);
});

// DELETE /events/:id - Supprimer un événement
app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  events.splice(index, 1);
  res.json({ message: 'Événement supprimé' });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
```

**Démarrer le backend :**

```bash
node server.js
```

### Option 4 : Utiliser JSON Server (pour le développement rapide)

```bash
npm install -g json-server
```

Créez un fichier `db.json` :

```json
{
  "events": [
    {
      "id": 1,
      "title": "Concert Rock",
      "description": "Un super concert de rock",
      "date": "2024-12-31T00:00:00.000Z",
      "location": "Paris",
      "price": 50,
      "organizerId": 1,
      "imageUrl": "/images/event.png",
      "nbPlaces": 100,
      "nbrLike": 10
    }
  ]
}
```

Démarrez JSON Server :

```bash
json-server --watch db.json --port 3000
```

## 🎮 Démarrage du projet

### 1. Démarrer le backend (dans un terminal séparé)

```bash
# Si vous utilisez Node.js/Express
cd backend-fullstackproject
node server.js

# OU si vous utilisez JSON Server
json-server --watch db.json --port 3000
```

### 2. Démarrer le frontend Angular (dans un autre terminal)

```bash
npm start
# ou
ng serve
```

L'application sera accessible sur : **http://localhost:4200**

### 3. Ouvrir dans le navigateur

Ouvrez votre navigateur et naviguez vers `http://localhost:4200`

## 📁 Structure du projet

```
fullstackproject/
├── src/
│   ├── app/
│   │   ├── features/              # Modules fonctionnels
│   │   │   ├── events/            # Module événements
│   │   │   │   ├── card-event/    # Composant carte événement
│   │   │   │   ├── detail-event/  # Détails d'un événement
│   │   │   │   ├── formevents/    # Formulaire événement
│   │   │   │   ├── list-event/    # Liste des événements
│   │   │   │   └── side-bar/      # Barre latérale de filtres
│   │   │   └── users/             # Module utilisateurs
│   │   │       └── register/      # Inscription utilisateur
│   │   ├── layout/                # Composants de mise en page
│   │   │   ├── header/            # En-tête
│   │   │   ├── footer/            # Pied de page
│   │   │   ├── home/              # Page d'accueil
│   │   │   └── not-found/         # Page 404
│   │   ├── models/                # Modèles TypeScript
│   │   │   ├── eventy.ts          # Modèle Event
│   │   │   └── user.ts            # Modèle User
│   │   ├── shared/                # Composants partagés
│   │   │   ├── data/              # Services
│   │   │   │   └── events.service.ts
│   │   │   ├── directives/        # Directives personnalisées
│   │   │   └── pipes/             # Pipes personnalisés
│   │   ├── app.module.ts          # Module racine
│   │   └── app-routing.module.ts  # Routes
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── public/                        # Assets statiques
│   └── images/
├── angular.json                   # Configuration Angular
├── package.json                   # Dépendances npm
├── tsconfig.json                  # Configuration TypeScript
└── README.md                      # Ce fichier
```

## 🔌 API Endpoints requis

Le backend doit implémenter les endpoints suivants :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/events` | Récupérer tous les événements |
| `GET` | `/events?location=xxx` | Rechercher par lieu |
| `GET` | `/events/:id` | Récupérer un événement par ID |
| `POST` | `/events` | Créer un événement |
| `PUT` | `/events/:id` | Modifier un événement |
| `PATCH` | `/events/:id` | Mettre à jour partiellement (like, réservation) |
| `DELETE` | `/events/:id` | Supprimer un événement |

### Format des données Event

```typescript
interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  organizerId: number;
  imageUrl: string;
  nbPlaces: number;
  nbrLike: number;
}
```

## ✨ Fonctionnalités

### Gestion des événements
- ✅ Liste des événements avec recherche
- ✅ Affichage en cartes
- ✅ Détails d'un événement
- ✅ Création d'événement (formulaire réactif)
- ✅ Modification d'événement
- ✅ Suppression d'événement
- ✅ Système de likes
- ✅ Réservation de places

### Utilisateurs
- ✅ Formulaire d'inscription avec validation

### Interface
- ✅ Design responsive avec Bootstrap
- ✅ Navigation entre pages
- ✅ Pipes personnalisés (date, euro)
- ✅ Directives personnalisées (highlight, hover)

## 📜 Scripts disponibles

```bash
# Démarrer le serveur de développement
npm start
# ou
ng serve

# Compiler pour la production
npm run build

# Exécuter les tests unitaires
npm test

# Compiler en mode watch
npm run watch
```

## 🧪 Tests

### Prérequis pour les tests

Installez Google Chrome pour exécuter les tests Karma.

### Exécuter les tests

```bash
# Mode watch (recommandé pour le développement)
npm test

# Mode non-watch (pour CI/CD)
npm test -- --watch=false
```

### Configuration des tests

Les tests utilisent Karma et Jasmine. La configuration se trouve dans `karma.conf.js`.

**Note:** Si Chrome n'est pas trouvé, vous pouvez définir la variable d'environnement `CHROME_BIN` :

```powershell
# Windows PowerShell
$env:CHROME_BIN = "C:\Program Files\Google\Chrome\Application\chrome.exe"

# Windows CMD
set CHROME_BIN=C:\Program Files\Google\Chrome\Application\chrome.exe
```

## 🐛 Dépannage

### Problème : "Cannot find module"

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : Erreur CORS

Assurez-vous que votre backend accepte les requêtes CORS depuis `http://localhost:4200` :

```javascript
// Dans votre backend Express
app.use(cors({
  origin: 'http://localhost:4200'
}));
```

### Problème : Backend non accessible

Vérifiez que :
1. Le backend est démarré sur le port 3000
2. L'URL dans `events.service.ts` est correcte : `http://localhost:3000/events/`
3. Aucun firewall ne bloque le port 3000

### Problème : Tests ne démarrent pas

1. Installez Google Chrome
2. Vérifiez que `CHROME_BIN` est défini si Chrome est dans un emplacement non standard
3. Vérifiez `karma.conf.js` pour la configuration

### Problème : Erreurs de build (budget exceeded)

Les warnings concernant la taille des bundles peuvent être ignorés en développement. Pour la production, optimisez votre code ou ajustez les budgets dans `angular.json`.

## 📝 Notes importantes

- Le projet utilise Angular 18
- Bootstrap 5 pour le styling
- RxJS pour la gestion des observables
- Les services utilisent HttpClient pour communiquer avec l'API
- Tous les appels API sont asynchrones avec gestion d'erreurs

## 🤝 Contribution

Pour contribuer au projet :
1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Ouvrez une Pull Request

## 📄 Licence

Ce projet est destiné à des fins éducatives et de démonstration.

## 👤 Auteur

Projet Full Stack Angular - Gestion d'événements

---

**Bonne chance avec votre projet ! 🚀**

