import React, { Component } from 'react'
import SearchBarContainer from "../search_bar/search_bar_container";

export default class Portfolio extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentBalance: 0,
    }
  }

  componentDidMount(){
    this.props.fetchPortfolio(this.props.currentUser.id);
    this.setState({currentBalance: this.props.accountBalance});
  }

  componentDidUpdate(){
    if (this.props.accountBalance !== this.state.currentBalance) {
      this.setState({currentBalance: this.props.accountBalance});
    }
  }

  render() {
    return (
      <div>
        <div className="trading-container">
          <div className="cash-label">Cash Available: </div>
          <div className="account-balance">${this.state.currentBalance}</div>
          <SearchBarContainer userId={this.props.currentUser.id}/>
        </div>
      </div>
    )
  }
}
