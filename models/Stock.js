const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ticker: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Stock = mongoose.model('stock', StockSchema);
