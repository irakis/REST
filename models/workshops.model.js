const mongoose = require('mongoose');

const workshopsSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    concertId: { type: String, required: true },
})

module.exports = mongoose.model('Workshop', workshopsSchema);