import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_NEW_BALANCE = "RECEIVE_NEW_BALANCE";

// todo rename this file portfolio actions
export const receiveSearch = results => ({
  type: RECEIVE_SEARCH,
  results,
});

export const receiveNewBalance = accountBalance => ({
  type: RECEIVE_NEW_BALANCE,
  accountBalance,
});

export const receivePortfolio = portfolio => ({
  type: RECEIVE_PORTFOLIO,
  portfolio,
})

// export const fetchStockPrice = symbol => dispatch => {
//   return StockApiUtil.fetchStockPrice(symbol).then(latestPrice => {

//   })
// }

export const fetchAccountBalance = (userId) => dispatch => {
  return StockApiUtil.fetchAccountBalance(userId).then(accountBalance => {
    return dispatch(receiveNewBalance(accountBalance))
  })
};

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
  return StockApiUtil.purchaseStock(payload).then(accountBalance => {
    return dispatch(receiveNewBalance(accountBalance));
  })
};
