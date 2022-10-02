const Seat = require('../models/seat.model');
const { v4: uuidv4 } = require('uuid');

exports.getAll = async (req, res) => {
    try {
        const chair = await Seat.find();
        console.log('chair'), chair
        if (!chair) {
            res.status(404).json({ message: 'Not found' })
        } else res.json(chair)
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const random = Math.floor(Math.random() * count)
        const chair = await Seat.findOne().skip(random);
        if (!chair) {
            res.status(404).json({ message: 'Not found' })
        } else res.json(chair);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getSingle = async (req, res) => {
    try {
        const chair = await Seat.findById(req.params.id);
        if (!chair) {
            res.status(404).json({ message: 'Not found' })
        } else res.json(chair);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.editSingle = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const chair = await Seat.findById(req.params.id)
        if (chair) {
            chair.day = day;
            chair.seat = seat;
            chair.client = client;
            chair.email = email;
            await chair.save();
            res.json(chair)
        } else {
            res.status(404).json({ message: 'Not found' })
        };
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.postSingle = async (req, res) => {
    try {
        const { day, seat, client, email, io } = req.body;
        const nextId = uuidv4();
        const newChair = await new Seat({ id: nextId, day: day, seat: seat, client: client, email: email });
        await newChair.save();
        res.json(newChair);
        req.io.emit('seatsUpdated', newChair)
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.deleteSingle = async (req, res) => {
    try {
        const chair = await Seat.findById(req.params.id);
        if (chair) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json(await Seat.find());
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

