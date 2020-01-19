//securitySchema stored in db
//portfolio is a collection of secuirty

//Mongoose schema models are used
const mongoose = require('mongoose')
const  Schema = mongoose.Schema
const tradeSchema = new Schema({
  tradeType: {
    type: String,
    required: true
  },
  pricePerShare:{
    type: Number,
    required: true,
    min:0
  },
  sharesInTxn: {
    type: Number,
    required: true,
    min: 1
  },
  txnDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})
var Trade = mongoose.model('Trade', tradeSchema);
const  securitySchema = new  Schema({
  companyTicker: {
    type: String,
    required: true,
    unique: true
  },
  avgPrice:{
    type: Number,
    required: true,
    min: 0
  },
  sharesLeft: {
    type: Number,
    required: true,
    min: 0
  },
  trades: [tradeSchema]
})

var Security = mongoose.model('Security', securitySchema)

//exporting out Schema's
module.exports = {
  Security: Security,
  Trade: Trade
}
