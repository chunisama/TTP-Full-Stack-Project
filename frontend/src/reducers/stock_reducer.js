import { RECEIVE_PORTFOLIO } from '../actions/stock_actions';

const _nullState = {};

const stockReducer = (state = _nullState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PORTFOLIO:
      return action.data
    default:
      return state;
  }
};

export default stockReducer;