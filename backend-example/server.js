/**
 * Backend API REST pour Full Stack Project
 * Serveur Express simple avec données en mémoire
 * 
 * Pour utiliser ce backend :
 * 1. Créez un nouveau dossier : mkdir backend-fullstackproject
 * 2. Copiez ce fichier dans le dossier
 * 3. Dans le dossier, exécutez : npm init -y
 * 4. Installez les dépendances : npm install express cors body-parser
 * 5. Lancez le serveur : node server.js
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Autoriser les requêtes depuis Angular
  credentials: true
}));
app.use(bodyParser.json());

// Base de données en mémoire (remplacez par une vraie base de données en production)
let events = [
  {
    id: 1,
    title: "Concert Rock",
    description: "Un super concert de rock avec les meilleurs artistes",
    date: new Date("2024-12-31T20:00:00"),
    location: "Paris, Zénith",
    price: 50,
    organizerId: 1,
    imageUrl: "/images/event.png",
    nbPlaces: 100,
    nbrLike: 10
  },
  {
    id: 2,
    title: "Festival de Jazz",
    description: "Festival de jazz en plein air",
    date: new Date("2025-01-15T18:00:00"),
    location: "Lyon, Parc de la Tête d'Or",
    price: 35,
    organizerId: 2,
    imageUrl: "/images/event.png",
    nbPlaces: 200,
    nbrLike: 5
  },
  {
    id: 3,
    title: "Conférence Tech",
    description: "Conférence sur les nouvelles technologies",
    date: new Date("2025-02-20T14:00:00"),
    location: "Marseille, Centre de Congrès",
    price: 25,
    organizerId: 3,
    imageUrl: "/images/event.png",
    nbPlaces: 150,
    nbrLike: 15
  }
];

// ============================================
// ROUTES EVENTS
// ============================================

/**
 * GET /events
 * Récupérer tous les événements
 * Query params optionnels : ?location=xxx
 */
app.get('/events', (req, res) => {
  const { location } = req.query;
  let filteredEvents = [...events];
  
  // Filtrage par lieu si fourni
  if (location) {
    filteredEvents = events.filter(e => 
      e.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  res.json(filteredEvents);
});

/**
 * GET /events/:id
 * Récupérer un événement par ID
 */
app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  res.json(event);
});

/**
 * POST /events
 * Créer un nouvel événement
 */
app.post('/events', (req, res) => {
  const { title, description, date, location, price, organizerId, imageUrl, nbPlaces } = req.body;
  
  // Validation simple
  if (!title || !description || !date || !location || price === undefined) {
    return res.status(400).json({ error: 'Données manquantes' });
  }
  
  const newEvent = {
    id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
    title,
    description,
    date: new Date(date),
    location,
    price: parseFloat(price),
    organizerId: organizerId || 1,
    imageUrl: imageUrl || '/images/event.png',
    nbPlaces: nbPlaces || 100,
    nbrLike: 0
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

/**
 * PUT /events/:id
 * Modifier complètement un événement
 */
app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  events[index] = { 
    ...events[index], 
    ...req.body, 
    id, // S'assurer que l'ID ne change pas
    date: req.body.date ? new Date(req.body.date) : events[index].date
  };
  
  res.json(events[index]);
});

/**
 * PATCH /events/:id
 * Mettre à jour partiellement un événement
 * Utilisé pour : likes, réservation de places
 */
app.patch('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  // Gestion des likes
  if (req.body.nbrLike !== undefined) {
    events[index].nbrLike = (events[index].nbrLike || 0) + req.body.nbrLike;
  }
  
  // Gestion des réservations de places
  if (req.body.nbPlaces !== undefined) {
    const newNbPlaces = events[index].nbPlaces + req.body.nbPlaces;
    events[index].nbPlaces = Math.max(0, newNbPlaces); // Ne peut pas être négatif
  }
  
  // Autres champs
  Object.keys(req.body).forEach(key => {
    if (key !== 'nbrLike' && key !== 'nbPlaces') {
      events[index][key] = req.body[key];
    }
  });
  
  res.json(events[index]);
});

/**
 * DELETE /events/:id
 * Supprimer un événement
 */
app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Événement non trouvé' });
  }
  
  const deletedEvent = events.splice(index, 1)[0];
  res.json({ message: 'Événement supprimé', event: deletedEvent });
});

// ============================================
// ROUTE HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend Full Stack Project is running',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// GESTION DES ERREURS
// ============================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur', message: err.message });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Serveur backend démarré !');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   - GET    /events`);
  console.log(`   - GET    /events/:id`);
  console.log(`   - POST   /events`);
  console.log(`   - PUT    /events/:id`);
  console.log(`   - PATCH  /events/:id`);
  console.log(`   - DELETE /events/:id`);
  console.log(`   - GET    /health`);
  console.log(`\n✨ Prêt à recevoir des requêtes depuis Angular !`);
});

