const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stock = require('../../models/Stock');
const validateStockPurchase = require('../../validation/stocks');

const https = require("https");
const keys = require('../../config/keys');

// API call for search endpoint on AlphaVantage => will give response to client to provide user search results to pick a stock to purchase
router.get("/stocks/:stockQuery", (req, res) => { 
  const searchQuery = req.params.searchQuery
  https.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${keys.alphaVantageAPIKey}`, res => {
    res.setEncoding("utf8");   
    let body = "";   
    res.on("data", data => {     
      body += data;   
    });   
    res.on("end", () => {     
      body = JSON.parse(body);
      console.log(body);
    }); 
  });
});