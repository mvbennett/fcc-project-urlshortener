require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dns = require('dns');
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
  let domain;
  if (url.match(/^https*:\/\//i)) {
    domain = url.replace(/^https*:\/\//i, '');

    dns.lookup(domain, (err) => {
      if (err !== null) {
        return next(res.json({error: 'Invalid Url'}))
      } else {
        Url.findOne({original_url: url}, (err, existingUrl) => {
          if (err) return console.log(err);

          if (existingUrl === null) {
            shortenUrl(url, (data) => {
              next(res.json({original_url: data['original_url'], short_url: data['short_url']}));
            });
          } else {
            next(res.json({original_url: existingUrl['original_url'], short_url: existingUrl['short_url']}));
          }
        })


      }
    });

  } else {
    next(res.json({error: 'Invalid Url'}));
  }

});

app.get('/api/shorturl/:id', (req, res, next) => {
  let url = Url.findOne({short_url: parseInt(req.params.id)}, (err, url) => {
    if (err) console.log(err);

    res.redirect(url.original_url);
  });
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
