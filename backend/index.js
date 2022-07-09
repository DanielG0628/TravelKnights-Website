import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL =
  'mongodb+srv://Carlos:solraC@cluster0.ukckn.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )

  .catch((error) => console.log(error.message));

//const path = require("path");
//const { Email } = require("@mui/icons-material");

let tripList = [
  'Orlando, FL',
  'Kissime, FL',
  'Sarasota, FL',
  'St. Petersburg, FL',
  'Key West, FL',
  'Alexander City, AL',
  'Andalusia, AL',
  'Anniston, AL',
  'San Clemente, CA',
  'San Diego, CA',
  'San Fernando, CA',
  'San Francisco, CA',
  'San Gabriel, CA',
  'San Jose, CA',
  'Olathe, KS',
  'Osawatomie, KS',
  'Ottawa, KS',
  'Overland Park, KS',
  'Pittsburg, KS',
  'Salina, KS',
  'Shawnee, KS',
  'Smith Center, KS',
  'Topeka, KS',
  'Wichita, KS',
];

//require('dotenv').config();

app.post('/api/addTrip', async (req, res, next) => {
  //incoming: userId, location
  //outgoing: error

  let error = '';

  const { userId, location } = req.body;

  // TEMP FOR LOCAL TESTING
  tripList.push(location);

  let ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => {
  //incoming: email, password
  //outgoing: id, name, error

  let error = '';

  const { email, password } = req.body;

  let id = -1;
  let n = '';

  if (email.toLowerCase() == 'johnsmith@gmail.com' && password == 'COP4331') {
    id = 1;
    n = 'John Smith';
  } else {
    error = 'Invalid user name/password';
  }

  let ret = { id: id, name: n, error: error };
  res.status(200).json(ret);
});

app.post('/api/searchTrip', async (req, res, next) => {
  //incoming: userId, search
  //outgoing: results[], error

  let error = '';

  const { userId, search } = req.body;
  let _search = search.toLowerCase().trim();
  let _ret = [];

  for (var i = 0; i < tripList.length; i++) {
    let lowerFromList = tripList[i].toLocaleLowerCase();
    if (lowerFromList.indexOf(_search) >= 0) {
      _ret.push(tripList[i]);
    }
  }

  let ret = { results: _ret, error: '' };
  res.status(200).json(ret);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
