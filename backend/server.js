const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000;
//const cors = require('cors');

//require('dotenv').config();

/*
app.use(cors());
app.use(express.json());
*/

//Db connection
connectDB();

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
