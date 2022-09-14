const Testimonial = require('../models/testimonial.model')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async (req, res) => {
    try {
        const testi = await Testimonial.find();
        if (testi) res.json(testi)
        else res.status(404).json({ message: 'Not found' })
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const testi = await Testimonial.findOne().skip(rand);
        if (testi) res.json(testi)
        else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.getSingle = async (req, res) => {
    try {
        const testi = await Testimonial.findById({ _id: req.params.id });
        if (testi) res.json(testi)
        else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.editSingle = async (req, res) => {
    const { author, text } = req.body
    try {
        const testi = await Testimonial.findById({ _id: req.params.id });
        if (testi) {
            testi.author = author;
            testi.text = text;
            await testi.save();
            res.json(testi);
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};

exports.postSingle = async (req, res) => {
    try {
        const { author, text } = req.body;
        const nextId = uuidv4();
        const newTesti = new Testimonial({ id: nextId, author: author, text: text });
        await newTesti.save();
        res.json(await newTesti);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.deleteSingle = async (req, res) => {
    try {
        const testi = await Testimonial.findById(req.params.id);
        if (testi) { await Testimonial.deleteOne({ _id: req.params.id })
        res.json(await Testimonial.find())
        } else res.status(404).json({ message: 'Not found' })
    } catch (err) { res.status(500).json({ message: err }) }
};