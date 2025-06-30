const School = require('../models/School');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const addSchool = async (req, res) => {
    
    const newSchool = {
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

    if (!newSchool.name || !newSchool.address || isNaN(newSchool.latitude) || isNaN(newSchool.longitude)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    await School.create(newSchool).then(() => {
        res.status(201).json({ message: 'School added successfully' });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    });
};

const listSchools = async (req, res) => {

    const { latitude, longitude } = req.query;
    // Convert to numbers
    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({ message: 'Invalid location coordinates' });
    }
    
    const schools = await School.findAll();
    if (!schools || schools.length === 0) {
        return res.status(404).json({ message: 'No schools found' });
    }

    const schoolsWithDistance = schools.map(school => {
      const schoolData = school.get({ plain: true }); // ✅ convert to plain object
      const distance = calculateDistance(userLatitude, userLongitude, schoolData.latitude, schoolData.longitude);
      return {
        ...schoolData,
        distance
      };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
}


module.exports = {
  addSchool,
  listSchools
};