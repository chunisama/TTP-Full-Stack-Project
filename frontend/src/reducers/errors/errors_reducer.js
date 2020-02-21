import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import PortfolioErrorsReducer from './portfolio_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  portfolio: PortfolioErrorsReducer,
});