const fs = require('fs');
const Book = require('../../models/Book');

exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message : 'Livre supprimé !' })})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};