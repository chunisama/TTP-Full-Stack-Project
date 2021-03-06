import * as StockApiUtil from '../util/stock_api_util';
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_NEW_BALANCE = "RECEIVE_NEW_BALANCE";
export const RECEIVE_PORTFOLIO_ERRORS = "RECEIVE_PORTFOLIO_ERRORS";
export const RECEIVE_LATEST_PRICE = "RECEIVE_LATEST_PRICE";
export const RECEIVE_LATEST_BATCH_PRICES = "RECEIVE_LATEST_BATCH_PRICES";

// todo: rename this file portfolio actions
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
});

export const receiveLatestPrice = payload => ({
  type: RECEIVE_LATEST_PRICE,
  payload,
})

export const receiveLatestBatchPrices = payload => ({
  type: RECEIVE_LATEST_BATCH_PRICES,
  payload,
})

export const receivePortfolioErrors = errors => ({
  type: RECEIVE_PORTFOLIO_ERRORS,
  errors,
});

export const fetchStockPrice = symbol => dispatch => {  
  return StockApiUtil.fetchLatestPrice(symbol).then(payload => {
    return dispatch(receiveLatestPrice(payload))
  })
};

export const fetchStockBatchPrices = symbols => dispatch => {
  return StockApiUtil.fetchLatestBatchPrices(symbols).then(payload => {
    return dispatch(receiveLatestBatchPrices(payload))
  })
};

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
  },  err => {
    return dispatch(receivePortfolioErrors(err.response.data))
  })
};
