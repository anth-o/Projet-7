const Book = require('../../models/Book');
const fs = require('fs');
const mongoSanitize = require('mongo-sanitize');

exports.modifyBook = (req, res) => {
    let bookObject = req.file ? {
        ...JSON.parse(mongoSanitize(req.body.book)),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...mongoSanitize(req.body) };

    delete bookObject._userId;

    Book.findOne({_id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => {
                        if (req.file) {
                            const imagePath = `./images/${book.imageUrl.split('/').pop()}`;
                            fs.unlink(imagePath, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                        res.status(200).json({ message: "Livre modifié avec succès !"})
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};