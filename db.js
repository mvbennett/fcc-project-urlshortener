const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: {type: String, required: true},
  short_url: Number
});

urlSchema.plugin(AutoIncrement, {id: 'order-seq', inc_field: 'short_url'});

const Url = mongoose.model('Url', urlSchema);

const shortenUrl = (url, done) => {
  let targetUrl = new Url({original_url: url});

  targetUrl.save((err, data) => {
    if (err) return console.error(err);

    done(data);
  })
}

// shortenUrl('https://omg.com', data => console.log(data));

// for first time tests of auto-increment
// let testUrl1 = new Url({original_url: 'https://freecodecamp.com'});

// let testUrl2 = new Url({original_url: 'https://coffeeguymike.com'});

// let testUrl3 = new Url({original_url: 'https://google.com'});

// testUrl1.save();
// testUrl2.save();
// testUrl3.save();

// const testSchema = new Schema({
//   name: {type: String, required: true},
//   number: {type: Number}
// });

// testSchema.plugin(AutoIncrement, {id: 'order-seq', inc_field: 'number'})

// const Test = mongoose.model('Test', testSchema);

// let test = new Test({name: 'f'});

// test.save();
// console.log(test.number);

// let test2 = new Test({name: 'h'});

// test2.save();
// console.log(test2.number);
exports.shortenUrl = shortenUrl;
exports.UrlModel = Url;
