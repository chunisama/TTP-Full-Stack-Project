import React, { Component } from 'react'
import SearchBarContainer from "../search_bar/search_bar_container";

export default class Portfolio extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentBalance: 0,
      portfolioValue: 0,
      errors: {},
      symbols: new Set(),
      quantities: [],
    };
    this.renderPortfolioItems = this.renderPortfolioItems.bind(this);
    this.renderLatestStockPrices = this.renderLatestStockPrices.bind(this);
    // this.fetchLatestStockPrice = this.fetchLatestStockPrice.bind(this);
    this.updatePortfolioValue = this.updatePortfolioValue.bind(this);
    this.fetchLatestStockBatchPrices = this.fetchLatestStockBatchPrices.bind(this);
  }

  componentDidMount(){
    this.props.fetchAccountBalance(this.props.currentUser.id);
    this.setState({currentBalance: this.props.accountBalance});
    this.props.fetchPortfolio(this.props.currentUser.id).then(() => this.fetchLatestStockBatchPrices());
  }

  componentDidUpdate(){
    if (this.props.accountBalance !== this.state.currentBalance) {
      this.setState({currentBalance: this.props.accountBalance})
      this.props.fetchPortfolio(this.props.currentUser.id)
      .then(() => {
        return this.fetchLatestStockBatchPrices()
      });
    }
     else if (this.props.errors !== this.state.errors) {
      this.setState({errors: this.props.errors});
    } 
  }

  updatePortfolioValue(){
    const qtys = this.state.quantities;
    let totalValue = 0;
    this.props.prices.map((quote,idx) => {
      debugger;
      return totalValue += quote.latestPrice * qtys[idx];
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

  // fetchLatestStockPrice(){
  //   const symbols = Array.from(this.state.symbols);
  //   symbols.map((symbol) => (
  //     this.props.fetchStockPrice(symbol)
  //     ));
  //   }

  fetchLatestStockBatchPrices(){
    const symbols = Array.from(this.state.symbols);
    this.props.fetchStockBatchPrices(symbols);
    }
    
  renderLatestStockPrices(){
    const qtys = this.state.quantities;
    let prices = this.props.prices.map((quote,idx) => {
      return (
        <div key={`price-${idx}`}>
          ${(quote.latestPrice * qtys[idx]).toFixed(2)}
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
        this.state.quantities.push(qty);
        return <div key={`qty-${idx}`} >{qty} Share(s)</div>
      });
      symbols = [...portItems.keys()].map(symbol => {
        this.state.symbols.add(symbol);
        return <div key={symbol} >{symbol} </div>
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
      <div className="main-container">
        <div className="portfolio-container">
          <div className="portfolio-header-wrapper">
            <div className="portfolio-value">Portfolio Value: ${this.updatePortfolioValue().toFixed(2)} </div>
          </div>
          <div className="portfolio-items-wrapper">
            <ul className="stock-index">
              <li className="index-item">
                  {this.renderPortfolioItems()}
                  <div className="stock-price">
                    {this.renderLatestStockPrices()}
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="trading-container">
          <div className="account-balance">Cash Available: ${this.state.currentBalance.toFixed(2)} </div>
          <SearchBarContainer userId={this.props.currentUser.id}/>
        </div>
        {this.renderErrors()}
      </div>
    )
  }
}
