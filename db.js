const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: {type: String, required: true, dropDups: true},
  short_url: {type: Number, dropDups: true}
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

exports.shortenUrl = shortenUrl;
exports.UrlModel = Url;
