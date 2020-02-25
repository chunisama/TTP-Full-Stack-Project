const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');
const Stock = require('../../models/Stock');
const validateStockPurchase = require('../../validation/stocks');

// const keys = require('../../config/keys');
const keys = process.env;
const fetch = require('node-fetch');

// async function for api request to AlphaVantage
async function apiCallAV(searchQuery, apikey) {
  let data = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apikey}`);
  let main = await data.json();
  return main;
}

// async function for api request to IEX for a stock quote
async function apiCallIEX(symbol, apikey) {
  let data = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/?token=${apikey}`);
  let main = await data.json();
  return main;
}

// async function for api request for a batch of stocks quotes to IEX 
async function apiBatchCallIEX(symbols, apikey) {
  let data = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${apikey}`);
  let main = await data.json();
  return main;
}

// API call for search endpoint on AlphaVantage => will give response to client to provide user search results to pick a stock to purchase
router.get(`/search/:searchQuery`, (req, res) => { 
  const searchQuery = req.params.searchQuery;
  apiCallAV(searchQuery, keys.alphaVantageAPIKey).then(results => {
    return res.json(results);
  })
});

// Fetching a user's portfolio of stocks & using same route to fetch every stock purchase for transactions page
router.get('/user/:userId', (req, res) => {
  Stock.find({user: req.params.userId})
    .then(stocks => res.json(stocks))
    .catch(err =>
      res.status(404).json({ noStocksFound: 'No stock holdings in your portfolio' }
    )
  );
});

// Fetching latest stock price using a company symbol 
router.get('/fetchLatestPrice/:symbol', (req, res) => {
  apiCallIEX(req.params.symbol, keys.iexAPIKey).then(apiRes => {
    let payload = { symbol: apiRes.symbol, latestPrice: apiRes.latestPrice };
    return payload;
  }).then(payload => {
    res.json(payload);
  })
});

// Api call for IEX to fetch a basket of latest stock prices 
router.get('/fetchLatestBatchPrices/:symbols', (req, res) => {
  apiBatchCallIEX(req.params.symbols, keys.iexAPIKey).then(apiRes => {
    let formattedRes = Object.values(apiRes).map(item => {
      return { 
      symbol: item.quote.symbol, 
      open: item.quote.open,
      previousClose: item.quote.previousClose,
      latestPrice: item.quote.latestPrice,
      isUSMarketOpen: item.quote.isUSMarketOpen,
    }});
    return formattedRes;
  }).then(payload => {
    res.json(payload);
  })
});

// Creating an db entry for stock purchase => user building portfolio
router.post('/purchaseStock',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStockPurchase(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    apiCallIEX(req.body.symbol, keys.iexAPIKey).then(apiRes => {
      if (req.body.balance >= apiRes.latestPrice * req.body.qty){
        const newStock = new Stock({
          user: req.body.userId,
          symbol: req.body.symbol,
          quantity: req.body.qty,
          price: apiRes.latestPrice
        });
        newStock.save();
        const newBalance = req.body.balance - (newStock.price * newStock.quantity);
        const payload = [newStock, newBalance];
        return payload;
        } else {
          return res.status(400).json({balance: 'You require more cash'});
        }}).then((payload) => {
        User.findByIdAndUpdate({_id: payload[0].user}, { balance: payload[1] }, {new: true}).then(
          (err, user) => {
            err ? res.json(err) : res.json(user);
          }
        );
      });
    }
  );



module.exports = router;