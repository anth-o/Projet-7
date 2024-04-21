const Book = require('../../models/Book');
const mongoSanitize = require('mongo-sanitize');

exports.addBook = (req, res) => {

    let bookObject = JSON.parse(mongoSanitize(req.body.book));
    delete bookObject._id;
    delete bookObject._userId;
    
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré' }))
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })}
            );
};