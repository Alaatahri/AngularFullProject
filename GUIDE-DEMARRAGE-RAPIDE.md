# 🚀 Guide de démarrage rapide - Full Stack Project

Ce guide vous permet de démarrer le projet en **5 minutes** !

## ✅ Prérequis

Vérifiez que vous avez installé :
- Node.js (version 18+) : `node --version`
- npm : `npm --version`

## 📦 Installation (3 étapes)

### 1️⃣ Installer les dépendances du frontend

```bash
cd AngularTraining  # ou votre dossier de projet
npm install
```

### 2️⃣ Configurer et démarrer le backend

**Option A : Utiliser le backend exemple fourni**

```bash
# Dans un nouveau terminal
cd backend-example
npm install
npm start
```

Le backend sera accessible sur `http://localhost:3000` ✅

**Option B : Utiliser JSON Server (plus rapide)**

```bash
# Installez JSON Server globalement
npm install -g json-server

# Créez un fichier db.json avec ce contenu :
{
  "events": [
    {
      "id": 1,
      "title": "Concert Rock",
      "description": "Un super concert",
      "date": "2024-12-31T20:00:00.000Z",
      "location": "Paris",
      "price": 50,
      "organizerId": 1,
      "imageUrl": "/images/event.png",
      "nbPlaces": 100,
      "nbrLike": 10
    }
  ]
}

# Démarrez JSON Server
json-server --watch db.json --port 3000
```

### 3️⃣ Démarrer le frontend Angular

```bash
# Dans le dossier principal du projet
npm start
# ou
ng serve
```

Le frontend sera accessible sur `http://localhost:4200` ✅

## 🎯 Vérification

1. **Backend fonctionne** : Ouvrez `http://localhost:3000/events` dans votre navigateur
   - Vous devriez voir un tableau JSON avec les événements

2. **Frontend fonctionne** : Ouvrez `http://localhost:4200`
   - Vous devriez voir la page d'accueil de l'application

3. **Tout fonctionne ensemble** : 
   - Allez sur la page "Gérer les événements"
   - Vous devriez voir les événements s'afficher

## 🐛 Problèmes courants

### "Cannot GET /events"
➡️ Le backend n'est pas démarré. Vérifiez que le terminal backend est ouvert.

### "CORS error" ou erreur réseau
➡️ Vérifiez que le backend est bien sur le port 3000 et que CORS est activé.

### "npm install" échoue
➡️ Supprimez `node_modules` et `package-lock.json`, puis réinstallez :
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation complète

Pour plus de détails, consultez le fichier [README.md](README.md)

## ✨ C'est tout !

Votre application est maintenant prête à être utilisée ! 🎉

**Résumé des URLs :**
- Frontend : http://localhost:4200
- Backend API : http://localhost:3000/events
- Health Check : http://localhost:3000/health

