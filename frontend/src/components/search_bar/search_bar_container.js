import { connect } from 'react-redux';
import Search from './search';
import { searchStock, purchaseStock } from '../../actions/stock_actions';

const msp = state => ({
  results: state.entities.search,
  accountBalance: state.session.user.balance,
});

const mdp = dispatch => {
  return {
    searchStock: string => dispatch(searchStock(string)),
    purchaseStock: (data) => dispatch(purchaseStock(data)),
  }
};

export default connect(msp, mdp)(Search);