const express = require('express');
const router = express.Router();

// Import des middlewares
const auth = require('../middlewares/auth');
const sharpMulter = require('../middlewares/sharpMulter');

// Import imports des controllers pour les livres
const { deleteBook } = require('../controllers/book/deleteBook');
const { getAllBooks } = require('../controllers/book/getAllBooks');
const { addBook } = require('../controllers/book/addBook');
const { getBook } = require('../controllers/book/getBook');
const { modifyBook } = require('../controllers/book/modifyBook');
const { getBestBooks } = require('../controllers/book/getBestBooks');
const { addRating } = require('../controllers/book/addRating');

router.get('/', getAllBooks);
router.get('/bestrating', getBestBooks);
router.get('/:id', getBook);
router.post('/:id/rating', auth, addRating);
router.post('/', auth, sharpMulter, addBook);
router.put('/:id', auth, sharpMulter, modifyBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;