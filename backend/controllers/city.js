const City = require('../models/City');

exports.createCity = (req, res, next) => {
    const city = new City({
        place_id: req.body.place_id,
        name: req.body.name,
        country: req.body.country,
        lat: req.body.lat,
        lon: req.body.lon,
    });
    city.save()
        .then(() => res.status(201).json({ message: 'City created !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteCity = (req, res, next) => {
    City.deleteOne({ place_id: req.params.id })
        .then(() => res.status(200).json({ message: 'City deleted !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneCity = (req, res, next) => {
    City.findOne({ place_id: req.params.id })
        .then((city) => res.status(200).json(city))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllCity = (req, res, next) => {
    City.find()
        .then((city) => res.status(200).json(city))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateCity = (req, res, next) => {
    const city = new City({
        _id: req.params.id,
        place_id: req.body.place_id,
        name: req.body.name,
        country: req.body.country,
        lat: req.body.lat,
        lon: req.body.lon,
    });
    City.updateOne({ _id: req.params.id }, city)
        .then(() => res.status(200).json({ message: 'City updated !' }))
        .catch((error) => res.status(400).json({ error }));
};
