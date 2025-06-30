const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mysqlDB = require('./db');

mysqlDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use('/api', require('./routes/schoolRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));