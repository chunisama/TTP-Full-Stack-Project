import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { fetchPortfolio } from '../../actions/stock_actions';

const msp = state => ({
  currentUser: state.session.user,
});

const mdp = dispatch => {
  return {
    fetchPortfolio: (userId) => dispatch(fetchPortfolio(userId)),
  }
}

export default connect(msp, mdp)(Portfolio);