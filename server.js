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

//Init Middleware
app.use(express.json({ extended: false }));

//test route
//app.get('/', (req, res) => res.send('API Running'));

//Defining routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
