import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { searchStock } from '../../actions/stock_actions';


const msp = state => ({
  currentUser: state.session.user,
});

// const mdp = dispatch => {
//   return {
//     searchStock: string => dispatch(searchStock(string)),
//   }
// }

export default connect(msp, null)(Portfolio);