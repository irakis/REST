const Performer = require('../models/concert.model');

exports.getSingle = async (req, res) => {
    try {
        const performerId = req.params.performer;
        const performerConcerts = await Performer.find({ performer: performerId });
        if (!performerConcerts) {
            res.send('There is no ID in the database...')
        } else {
            res.json(performerConcerts);
        }
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.getSingleGenre = async (req, res) => {
    try {
        const genreId = req.params.genre;
        const genreConcerts = await Performer.find({ genre: genreId});
        if (genreConcerts) {
            res.json(genreConcerts)
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: ree }) }
};

exports.getByPriceRange = async (req, res) => {
    try {
        const priceMin = req.params.price_min;
        const priceMax = req.params.price_max;
        console.log('??? : ', priceMin, priceMax, req.params);
        const priceRangeConcerts = await Performer.find({ price: { $gte: priceMin, $lte: priceMax }});
        if (priceRangeConcerts) {
            res.json(priceRangeConcerts)
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: ree }) }
};

exports.getSingleByPriceDay = async (req, res) => {
    try {
        const dayId = req.params.day;
        const priceId = req.params.price;
        const concertsByDay = await Performer.find({ day: dayId, price: priceId});
        if (concertsByDay) {
            res.json(concertsByDay)
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: ree }) }
};
