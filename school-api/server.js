const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mysqlDB = require('./db');
const School = require('./models/School');

app.use(cors());
app.use(express.json());

// in server.js (top or before app.listen)
mysqlDB.sync();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', require('./routes/schoolRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));