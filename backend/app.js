const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

// Connection avec MongoDB
mongoose.connect('mongodb+srv://antho:ei1IBpvyaiw3IzWt@projet7.8h9g0zb.mongodb.net/?retryWrites=true&w=majority&appName=Projet7')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
const limiter = rateLimit({
    windowMs: 10* 60 * 1000,
    max: 100,
    message: 'Veuillez patienter, vous avez effectuées trop de requêtes.'
});

app.use(limiter);
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;