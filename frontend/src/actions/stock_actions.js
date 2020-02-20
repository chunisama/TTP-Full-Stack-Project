import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";

const receiveSearch = results => ({
  type: RECEIVE_SEARCH,
  results,
});

export const searchStock = (query) => dispatch => {
  return StockApiUtil.searchStock(query).then(results => {
    return dispatch(receiveSearch(results));
  })
};