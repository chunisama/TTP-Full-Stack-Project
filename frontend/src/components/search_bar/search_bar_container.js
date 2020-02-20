import { connect } from 'react-redux';
import Search from './search';
import { searchStock } from '../../actions/stock_actions';

const msp = state => ({
  results: state.entities.search,
});

const mdp = dispatch => {
  return {
    searchStock: string => dispatch(searchStock(string)),
  }
};

export default connect(msp, mdp)(Search);