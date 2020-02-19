import axios from 'axios';

export const searchStock = (searchQuery) => {
  return axios.get(`/api/stocks/${searchQuery}`);
};

