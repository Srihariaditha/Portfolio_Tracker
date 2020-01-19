//refer varaibles in env using dotenv package
require('dotenv').config();
//trying to get
//setting up server
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connecting to our database
//DATABASE_URL is location which we want for our  database. This is set up in .env file
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true,useNewUrlParser : true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

//setting up server to open JSON
app.use(express.json())

//tell the server about the routes it needs to handle and useNewUrlParser
const portfolioTracker = require('./routes/portfolioTracker')
app.use('/portfolio', portfolioTracker)

app.listen(8000, ()=> console.log('Server Started'));
