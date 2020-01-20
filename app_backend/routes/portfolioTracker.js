const express = require('express')
const router = express.Router();
//get dbSchema's
const dbSchema = require('../models/db')


//adding a new Security to a portfolio -
router.post('/addSecurity', async function(req,res) {
  //Add trade in portfolio
  console.log('In addSecurity to buy trade with: '+ req.body.companyTicker)
  const security = new dbSchema.Security({
    companyTicker: req.body.companyTicker,
    avgPrice: Number((req.body.pricePerShare).replace(',','')),
    sharesLeft: parseInt(req.body.numOfShares)
  })
  const trade = new dbSchema.Trade({
    tradeType:"BUY",
    pricePerShare: Number((req.body.pricePerShare).replace(',','')),
    sharesInTxn: parseFloat(req.body.numOfShares)
  })
  security.trades.push(trade)
  try{
     const newSecurity= await security.save()
     res.status(200).json(newSecurity) //success status
   }catch(err){
     res.status(400).json({message: err.message}) //error status
   }
})

//update the portifolio when a trade is brought
router.patch('/buyTrade/:ticker', getSecurity, async (req,res) => {
  console.log('In Update to buy trade with: '+ res.security)
  console.log('body: ', req.body)
  if(req.body.numOfShares != null && req.body.pricePerShare!= null){
    //update Avg price of trade
    old_avg = res.security.avgPrice
    old_shares = res.security.sharesLeft
    cur_price = Number((req.body.pricePerShare).replace(',',''))
    new_shares = Number((req.body.numOfShares).replace(',',''))
    res.security.sharesLeft += new_shares
    new_avg = ((old_avg*old_shares)+(cur_price*new_shares))/res.security.sharesLeft
    res.security.avgPrice = new_avg
    const trade = new dbSchema.Trade({
      tradeType:"BUY",
      pricePerShare: cur_price,
      sharesInTxn: new_shares
    })
    res.security.trades.push(trade)
    try{
      const updatesecurity = await res.security.save()
      console.log(res.security);
      res.status(200).json(updatesecurity)
    }catch(err){
      res.status(400).json({message: err.message})
    }
  }else{
    res.status(400).json({message: "No of shares and PricePerShare cannot be null"})
  }
})

//update the portifolio when a trade is sold
router.patch('/sellTrade/:ticker', getSecurity, async (req,res) => {
  console.log('In update to SellTrade with: '+ req.body)
  if(res.security!=null){
    ticker = res.security.companyTicker
    sharesLeft =res.security.sharesLeft -Number((req.body.numOfShares).replace(',',''))
    if(sharesLeft < 0){
        res.json({message: ticker+' shares are not sufficient to execute trade'})
    }else{
      pricePerShare = (req.body.pricePerShare==undefined)? 0 : Number(req.body.pricePerShare.replace(',',''))
      const trade = new dbSchema.Trade({
        tradeType:"SELL",
        pricePerShare: pricePerShare,
        sharesInTxn: req.body.numOfShares
      })
      res.security.trades.push(trade)
      res.security.sharesLeft = sharesLeft
      try{
        const newSecurity= await res.security.save()
        res.status(200).json(newSecurity) //success status
      }catch(err){
        res.status(400).json({message: err.message}) //error status
      }
    }
  }else{
      res.status(400).json({message: "Cannot find given security ticker "})
    }
})
//remove one security
router.delete('/deleteSecurity/:ticker', getSecurity, async (req,res) => {
  console.log("In delete" + res.security)
  try{
    await res.security.remove();
    return res.json({message: 'Deleted '+req.params.ticker+' from portfolio'})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})
//delete all securites
router.delete('/', async (req,res) => {
  console.log("In delete all securities" )
  try{
    await dbSchema.Security.remove({})
    return res.status(200).json({message: 'Deleted all securites from portfolio'})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

//get all securities currently held in a portfolio
router.get('/allSecurities', async function(req,res) {
  console.log('In get all securities with: '+ req.body)
  try{
    const portfolio = await dbSchema.Security.find({},{companyTicker: true, avgPrice: true, sharesLeft: true})
    res.json(portfolio)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

//get all securities and trades in a portfolio
router.get('/all', async function(req,res) {
  console.log('In get all securities and trades with: '+ req.params)
  try{
    const portfolio = await dbSchema.Security.find()
    res.status(200).json(portfolio)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

//get a single security
router.get('/security/:ticker', getSecurity, async (req,res) => {
  console.log('In getSecurity with: '+ req.params.ticker)
  res.status(200).json(res.security)
})

//fetch retruns from portfolio
router.get('/fetchReturns', async (req,res) => {
  console.log('In fetchReturns  ')
  try{
    var cur_price = 100, sum = 0;
    const portfolio = await dbSchema.Security.find({},{avgPrice: 1, sharesLeft: 1})
      console.log('In fetchReturns  '+ portfolio)
    portfolio.forEach(function(security){
      sum += (cur_price-security.avgPrice)*security.sharesLeft
    })
    res.status(200).json({return: 'Total returns from Portfolio are: '+ sum})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})


//using middleware to get security from portfolio
async function getSecurity(req, res, next){
  try{
    security = await dbSchema.Security.findOne({companyTicker: req.params.ticker})
    if (security == null) {
     return res.status(404).json({ message: 'Cannot find Security: ' + req.params.ticker})
    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
  res.security = security
  next()
}

module.exports = router ;
