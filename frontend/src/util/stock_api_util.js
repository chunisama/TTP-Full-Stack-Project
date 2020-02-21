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
}

// export const fetchKeyStats = symbol => (
  
// );
