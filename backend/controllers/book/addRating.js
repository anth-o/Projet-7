const Book = require('../../models/Book'); 

exports.addRating = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            book.ratings.map(rate => {
                if ( req.auth.userId === rate.userId ) {
                    res.status(400).json({ message: 'Vous avez déjà noté ce livre' })
                }
            })
            
            book.ratings.push({
                'userId': req.auth.userId,
                'grade': req.body.rating
            });
            let sumRating = 0;

            book.ratings.map(rate => sumRating += rate.grade);
            book.averageRating = sumRating / book.ratings.length;

            Book.updateOne({ _id: req.params.id }, book)
                .then(() => { res.status(201).json(book) })
                .catch((error) => { res.status(401).json({ error }) });
        })
        .catch((error) => { res.status(401).json({ error}) });
};