import axios from 'axios';

export const searchStock = (searchQuery) => {
  return axios.get(`/api/stocks/search/${searchQuery}`);
};

export const purchaseStock = (data) => {
  return axios.post('/api/stocks/purchaseStock', data);
};

export const fetchPortfolio = (userId) => {
  return axios.get(`/api/stocks/user/${userId}`);
};

export const fetchAccountBalance = (userId) => {
  return axios.get(`/api/users/balance/${userId}`)
};

export const fetchLatestPrice = (symbol) => {
  return axios.get(`api/stocks/fetchlatestPrice/${symbol}`)
};

export const fetchLatestBatchPrices = (symbolsArr) => {
  let symbols = symbolsArr.join(",");
  return axios.get(`api/stocks/fetchlatestBatchPrices/${symbols}`)
};

