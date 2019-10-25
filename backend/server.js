const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//require('dotenv').config();

const app = express();
connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
