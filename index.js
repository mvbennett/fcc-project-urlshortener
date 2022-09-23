require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const multer = require('multer');
// const upload = multer();

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
  res.json({original_url: req.body['url']});
  next();
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
