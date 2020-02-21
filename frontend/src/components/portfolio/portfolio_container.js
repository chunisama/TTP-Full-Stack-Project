import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { fetchPortfolio, fetchAccountBalance, fetchStockPrice } from '../../actions/stock_actions';

const msp = state => {
  return {
    currentUser: state.session.user,
    accountBalance: state.session.user.balance,
    portfolio: state.entities.portfolio,
    prices: state.entities.prices,
    errors: state.errors.portfolio
  }
};

const mdp = dispatch => {
  return {
    fetchPortfolio: (userId) => dispatch(fetchPortfolio(userId)),
    fetchAccountBalance: (userId) => dispatch(fetchAccountBalance(userId)),
    fetchStockPrice: (symbol) => dispatch(fetchStockPrice(symbol)),
  }
};

export default connect(msp, mdp)(Portfolio);