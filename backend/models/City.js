const mongoose = require('mongoose');

const cityModel = mongoose.Schema({
    place_id: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true },
});

module.exports = mongoose.model('City', cityModel);
