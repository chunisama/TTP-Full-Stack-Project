import { combineReducers } from 'redux';
import searchReducer from './search_reducer';
import stockReducer from './stock_reducer';

const entitiesReducer = combineReducers({
  search: searchReducer,
  stocks: stockReducer,
});

export default entitiesReducer;
