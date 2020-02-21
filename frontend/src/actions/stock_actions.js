import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";

export const receiveSearch = results => ({
  type: RECEIVE_SEARCH,
  results,
});

export const receivePortfolio = portfolio => ({
  type: RECEIVE_PORTFOLIO,
  portfolio,
});

// export const fetchStockPrice = symbol => dispatch => {
//   return StockApiUtil.fetchStockPrice(symbol).then(latestPrice => {

//   })
// }

export const fetchPortfolio = (userId) => dispatch => {
  return StockApiUtil.fetchPortfolio(userId).then(portfolio => {
    return dispatch(receivePortfolio(portfolio));
  })
};

export const searchStock = (query) => dispatch => {
  return StockApiUtil.searchStock(query).then(results => {
    return dispatch(receiveSearch(results));
  })
};

export const purchaseStock = (payload) => dispatch => {
  return StockApiUtil.purchaseStock(payload).then(payload => {
    return dispatch(receivePortfolio(payload));
  })
};
