import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentString: "",
      display: false,
      currentStockSymbol: null,
      quantity: 0,
    }
    this.handleQuery = this.handleQuery.bind(this);
    this.handleBlur = this.handleBlur.bind(this);  
    this.handleFocus = this.handleFocus.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  handleQuery(e) {    
    this.setState({ currentString: e.target.value}, () => {
      if (this.state.currentString && this.state.currentString.length > 1) {
        if (this.state.currentString.length % 2 === 0) {
          return this.props.searchStock(this.state.currentString);
        }
      }
    })
  }

  handleQuantity(e){
    this.setState({quantity: e.target.value});
  }

  renderResults() {
    let results;
    if (this.state.currentString === "") {
      results = <div className="no-results"></div>;
    } else {
      let allResults = Object.values(this.props.results);
      // eslint-disable-next-line
      let filteredResults = allResults.filter(stock => {
        let region = "4. region";
        if (stock[region] === "United States") return stock;  
      })      
      let outputResults = filteredResults.map((stock, idx) => {
        let symbol = "1. symbol";
        let name = "2. name";      
        return <li key={idx} className="filtered-search" onClick={() => this.setState({currentString: stock[name], currentStockSymbol: stock[symbol]})}>
          <div className="search-symbol">{stock[symbol]}</div>
          <span className="search-name">{stock[name]}</span></li>
        });
      results = outputResults;
    }
    return results
  }

  handleBlur() {
    setTimeout(() => {
      if (this.state.display) {
        this.setState({ display: false });
      }
    }, 200);
  }

  handleFocus() {
    if (!this.state.display) {
      this.setState({ display: true })
    }
  }

  render() {
    let allResults = this.renderResults();
    let payload = { symbol: this.state.currentStockSymbol, 
      qty: this.state.quantity,
      balance: this.props.accountBalance,
      userId: this.props.userId };
    return (
        <div className="search-container">
          <input type="search" className="search-bar" onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleQuery} value={this.state.currentString} placeholder="Search a Company"/>
          {allResults.length > 0 && <div className={`search-results-${this.state.display}`} >
          <ul className="search-list">
            {allResults}
          </ul>
          </div> }
          <input type="text" onChange={this.handleQuantity} className="quantity" placeholder="Quantity"></input>
          <button onClick={() => this.props.purchaseStock(payload)}>Buy</button>
        </div> 
    )
  }
}

export default Search;