import { connect } from 'react-redux';
import Search from './search';
import { searchStock, purchaseStock } from '../../actions/stock_actions';

const msp = state => ({
  results: state.entities.search,
});

const mdp = dispatch => {
  return {
    searchStock: string => dispatch(searchStock(string)),
    purchaseStock: (data) => dispatch(purchaseStock(data)),
  }
};

export default connect(msp, mdp)(Search);