import { RECEIVE_LATEST_PRICE }  from '../actions/stock_actions';
import { merge } from 'lodash';
const _nullState = [];

const PriceReducer = (state = _nullState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LATEST_PRICE:
      let newState = merge({}, state);
      newState[action.payload.data.symbol] = action.payload.data.latestPrice;
      return newState;
    default:
      return state;
  }
};

export default PriceReducer;