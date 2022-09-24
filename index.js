require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const db = require('./db.js');
const Url = require('./db.js').UrlModel;
const shortenUrl = require('./db.js').shortenUrl;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res, next) => {
  let url = req.body['url'];

  let urlModel = new Url({original_url: url});

  urlModel.save((err, data) => {
    if (err) return console.log(err);


    next(res.json({original_url: data['original_url'], short_url: data['short_url']}));
  })
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
