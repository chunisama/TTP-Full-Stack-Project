import { RECEIVE_LATEST_PRICE, RECEIVE_LATEST_BATCH_PRICES }  from '../actions/stock_actions';
import { merge } from 'lodash';
const _nullState = [];

const PriceReducer = (state = _nullState, action) => {
  Object.freeze(state);
  switch (action.type) {
    // todo: Refactor this for single price fetch => to display price when user searches a price in search bar
    case RECEIVE_LATEST_PRICE:
      let newState = merge({}, state);
      newState[action.payload.data.symbol] = action.payload.data.latestPrice;
      return newState;
    case RECEIVE_LATEST_BATCH_PRICES:
      return action.payload.data;
    default:
      return state;
  }
};

export default PriceReducer;