import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { fetchPortfolio, fetchAccountBalance } from '../../actions/stock_actions';

const msp = state => {
  return {
    currentUser: state.session.user,
    accountBalance: state.session.user.balance,
    portfolio: state.entities.portfolio,
  }
};

const mdp = dispatch => {
  return {
    fetchPortfolio: (userId) => dispatch(fetchPortfolio(userId)),
    fetchAccountBalance: (userId) => dispatch(fetchAccountBalance(userId)),
  }
};

export default connect(msp, mdp)(Portfolio);