import { combineReducers } from 'redux';
import searchReducer from './search_reducer'

const entitiesReducer = combineReducers({
  search: searchReducer,
});

export default entitiesReducer;
