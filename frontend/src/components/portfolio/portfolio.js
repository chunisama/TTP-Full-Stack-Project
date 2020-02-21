import React, { Component } from 'react'
import SearchBarContainer from "../search_bar/search_bar_container";

export default class Portfolio extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentBalance: 0,
      portfolioValue: 0,
    }
    this.portfolioItems = this.portfolioItems.bind(this);
  }

  componentDidMount(){
    this.props.fetchAccountBalance(this.props.currentUser.id);
    this.setState({currentBalance: this.props.accountBalance});
    this.props.fetchPortfolio(this.props.currentUser.id);
  }

  componentDidUpdate(){
    if (this.props.accountBalance !== this.state.currentBalance) {
      this.setState({currentBalance: this.props.accountBalance})
      this.props.fetchPortfolio(this.props.currentUser.id);
    }
  }

  portfolioItems(){
    let qtys;
    let symbols
    const portItems = this.props.portfolio.reduce((prev, curr) => {
      let count = prev.get(curr.symbol) || 0;
      prev.set(curr.symbol, curr.quantity + count);
      return prev;
    }, new Map());
    if (portItems.size === 0){
      return <p>Your portfolio is empty</p>
    } else {
      qtys = [...portItems.values()].map((qty, idx) => {
        return <div key={idx} >{qty} Shares</div>
      });
      symbols = [...portItems.keys()].map(symbol => {
        return <div key={symbol} >{symbol} - </div>
      })

    }
    return (
      <li className="index-item">
        <div className="content-wrapper">
          <div className="company-symbol">
            {symbols}
          </div>
          <div className="share-quantity">
            {qtys}
          </div>
        </div>
      </li>
    )
  }


  render() {
    return (
      <div>
        <div className="portfolio-container">
          <div className="portfolio-header-wrapper">
            <div className="portfolio-title">Portfolio</div>
            <div className="portfolio-Value">{this.state.portfolioValue}</div>
          </div>
          <div className="portfolio-items-wrapper">
            <ul className="stock-index">
              {this.portfolioItems()}
            </ul>
          </div>
        </div>
        <div className="trading-container">
          <div className="cash-label">Cash Available: </div>
          <div className="account-balance">${this.state.currentBalance.toFixed(2)}</div>
          <SearchBarContainer userId={this.props.currentUser.id}/>
        </div>
      </div>
    )
  }
}
