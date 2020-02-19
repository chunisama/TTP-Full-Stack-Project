import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";

const receiveSearch = results => ({
  type: RECEIVE_SEARCH,
  results,
});

export const searchStock = (string) => dispatch => {
  StockApiUtil.searchStock(string).then(results => {
    dispatch(receiveSearch(results))
  })
};