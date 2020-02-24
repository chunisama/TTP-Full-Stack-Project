import { connect } from 'react-redux';
import Transactions from './transactions';
import { fetchPortfolio } from '../../actions/stock_actions';


const msp = state => {
  return {
    currentUser: state.session.user,
    transactions: state.entities.transactions,
  }
}

const mdp = dispatch => {
  return {
    fetchPortfolio: (userId) => dispatch(fetchPortfolio(userId)),
  }
}

export default connect(msp, mdp)(Transactions);