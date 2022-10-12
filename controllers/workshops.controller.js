const Workshop = require('../models/workshops.model');

exports.getAll = async (req, res) => {
    try {
        const workshops = await Workshop.find();
        res.json(workshops);
        if (!workshops) {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getSingle = async (req, res) => {
    try {
        const workshopId = req.params.id;
        const workshop = await Workshop.find(workshopId)
        res.json(workshop);
        if (!workshop) {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.putSingle = async (req, res) => {
    try {
        const newName = req.params.name;
        const newId = req.params.id;
        const id = req.params.cocnertId

        const selectedWorkshop = await Workshop.find(id);
        if (selectedWorkshop) {
            selectedWorkshop.name = newName;
            selectedWorkshop._id = newId;
            await selectedWorkshop.save();
            res.json(selectedWorkshop);
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

