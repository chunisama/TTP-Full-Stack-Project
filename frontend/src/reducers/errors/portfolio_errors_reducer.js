import { RECEIVE_PORTFOLIO_ERRORS } from "../../actions/stock_actions";
const _nullErrors = [];

const PortfolioErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_PORTFOLIO_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default PortfolioErrorsReducer;