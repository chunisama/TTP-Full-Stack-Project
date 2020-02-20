const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stock = require('../../models/Stock');
const validateStockPurchase = require('../../validation/stocks');

const keys = require('../../config/keys');
const fetch = require('node-fetch');

async function apiCallAV(searchQuery, apikey) {
  let data = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apikey}`);
  let main = await data.json();
  return main;
  
  // Testing
  // console.log(main);
}

// API call for search endpoint on AlphaVantage => will give response to client to provide user search results to pick a stock to purchase
router.get(`/search/:searchQuery`, (req, res) => { 
  const searchQuery = req.params.searchQuery;
  apiCallAV(searchQuery, keys.alphaVantageAPIKey).then(results => {
    return res.json(results);
  })
});



module.exports = router;