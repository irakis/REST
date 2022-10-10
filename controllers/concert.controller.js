const Concert = require('../models/concert.model');
const Seats = require('../models/seat.model');
const Workshop = require('../models/workshops.model')


exports.getAll = async (req, res) => {
    try {

        let con = await Concert.find();
        const workshop = await Workshop.find();
        console.log('con', workshop);
    
        const tickets = await Seats.find();
        con = await con.map(concert => ({ ...concert.toObject(), freeSeats: (50 - (tickets.filter((ticket) => ticket.day === concert.day)).length),
            workshop: workshop.find((work) => work.concertId === (concert._id).toString()) || 'No workshops'
        }));

        console.log('con po midyfikacjach:', con);

        if (!con) {
            res.status(404).json({ message: 'Not found' })
        } else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne().skip(rand)
        if (con) {
            res.json(con)
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: ree }) }
};

exports.getSingle = async (req, res) => {
    try {
        const id = req.params.id;
        const concertId = await Concert.find({ _id: id });
        if (!concertId) {
            res.send('There is no ID in the database...')
        } else {
            res.json(concertId);
        }
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { performer, genre, price, day } = req.body;
    try {
        const con = await Concert.findById(req.params.id)
        if (con) {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            await con.save();
            res.json(con)
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.postSingle = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image
        })
        await newConcert.save();
        res.json(await newConcert);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.deleteSingle = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id)
        if (con) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json(await Concert.find())
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) {
        res.status(500).json({ message: err })
    }
};