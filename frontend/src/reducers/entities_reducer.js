import { combineReducers } from 'redux';
import portfolioReducer from './portfolio_reducer';
import searchReducer from './search_reducer';
import transactionReducer from './transactions_reducer';
import PriceReducer from './price_reducer';

const entitiesReducer = combineReducers({
  search: searchReducer,
  portfolio: portfolioReducer,
  prices: PriceReducer,
  transactions: transactionReducer,
});

export default entitiesReducer;
