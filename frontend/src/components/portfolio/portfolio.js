import React, { Component } from 'react'
import SearchBarContainer from "../search_bar/search_bar_container";

export default class Portfolio extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentBalance: 0,
      portfolioValue: 0,
      errors: {},
      symbols: new Set(),
      quantities: new Set(),
    }
    this.renderPortfolioItems = this.renderPortfolioItems.bind(this);
    this.renderLatestStockPrice = this.renderLatestStockPrice.bind(this);
    this.fetchLatestStockPrice = this.fetchLatestStockPrice.bind(this);
    this.updatePortfolioValue = this.updatePortfolioValue.bind(this);
  }

  componentDidMount(){
    this.props.fetchAccountBalance(this.props.currentUser.id);
    this.setState({currentBalance: this.props.accountBalance});
    this.props.fetchPortfolio(this.props.currentUser.id).then(() => this.fetchLatestStockPrice());
  }

  componentDidUpdate(){
    if (this.props.accountBalance !== this.state.currentBalance) {
      this.setState({currentBalance: this.props.accountBalance})
      this.props.fetchPortfolio(this.props.currentUser.id)
      .then(() => this.fetchLatestStockPrice());
    }
     else if (this.props.errors !== this.state.errors) {
      this.setState({errors: this.props.errors});
    } 
  }

  updatePortfolioValue(){
    const symbols = Array.from(this.state.symbols);
    const qtys = Array.from(this.state.quantities);
    let totalValue = 0;
    symbols.map((symbol,idx) => {
      return totalValue += this.props.prices[symbol] * qtys[idx];
    });
    return totalValue;
  }

  renderErrors(){
    let formattedErrors = Object.keys(this.state.errors).map((error, i) => {
      return(
      <li key={`port-error-${i}`}>
        {this.state.errors[error]}
      </li>)
    })
    return formattedErrors;
  }

  fetchLatestStockPrice(){
    const symbols = Array.from(this.state.symbols);
    symbols.map((symbol) => (
      this.props.fetchStockPrice(symbol)
      ));
    }
    
  renderLatestStockPrice(){
    const symbols = Array.from(this.state.symbols);
    const qtys = Array.from(this.state.quantities);
    let prices = symbols.map((symbol,idx) => {
      return (
        <div className="stock-price" key={`price-${idx}`}>
          {(this.props.prices[symbol] * qtys[idx]).toFixed(2)}
        </div>
      )
    })
    return prices;
  }

  renderPortfolioItems(){
    let qtys;
    let symbols;
    const portItems = this.props.portfolio.reduce((prev, curr) => {
      let count = prev.get(curr.symbol) || 0;
      prev.set(curr.symbol, curr.quantity + count);
      return prev;
    }, new Map());
    if (portItems.size === 0){
      return <p>Your portfolio is empty</p>
    } else {
      qtys = [...portItems.values()].map((qty, idx) => {
        this.state.quantities.add(qty);
        return <div key={`qty-${idx}`} >{qty} Shares</div>
      });
      symbols = [...portItems.keys()].map(symbol => {
        this.state.symbols.add(symbol);
        return <div key={symbol} >{symbol} - </div>
      });
    }
    return(
      <>
    <div className="company-symbol">
      {symbols}
    </div>
    <div className="share-quantity">
      {qtys}
    </div>
      </>)
      }


  render() {
    return (
      <div>
        <div className="portfolio-container">
          <div className="portfolio-header-wrapper">
            <div className="portfolio-title">Portfolio</div>
            <div className="portfolio-value">{this.updatePortfolioValue()}</div>
          </div>
          <div className="portfolio-items-wrapper">
            <ul className="stock-index">
              <li className="index-item">
                <div className="content-wrapper">
                  {this.renderPortfolioItems()}
                  {this.renderLatestStockPrice()}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="trading-container">
          <div className="cash-label">Cash Available: </div>
          <div className="account-balance">${this.state.currentBalance.toFixed(2)}</div>
          <SearchBarContainer userId={this.props.currentUser.id}/>
        </div>
        {this.renderErrors()}
      </div>
    )
  }
}
