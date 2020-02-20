import axios from 'axios';

export const searchStock = (searchQuery) => {
  return axios.get(`/api/stocks/search/${searchQuery}`);
};

export const fetchPortfolio = (userId) => {
  return axios.get(`/api/stocks/${userId}`);
};

export const purchaseStock = (data) => {
  return axios.post('/api/stocks/purchaseStock', data);
};

// export const fetchKeyStats = symbol => (
  
// );
