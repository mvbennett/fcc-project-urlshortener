const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: {type: String, required: true},
  number: {type: Number}
});

testSchema.plugin(AutoIncrement, {id: 'order-seq', inc_field: 'number'})

const Test = mongoose.model('Test', testSchema);

let test = new Test({name: 'f'});

test.save();
console.log(test.number);

let test2 = new Test({name: 'h'});

test2.save();
console.log(test2.number);
