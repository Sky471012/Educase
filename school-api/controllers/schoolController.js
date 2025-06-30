const School = require('../models/School');

const addSchool = (req, res) => {
    const newSchool = {
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

    if (!newSchool.name || !newSchool.address || isNaN(newSchool.latitude) || isNaN(newSchool.longitude)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    School.create(newSchool).then(() => {
        res.status(201).json({ message: 'School added successfully' });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    });
};


module.exports = {
  addSchool
};