import React, { Component } from 'react'

export default class Transactions extends Component {

  componentDidMount(){
    this.props.fetchPortfolio(this.props.currentUser.id);
  }

  renderTransactions(){
    let trans = this.props.transactions.map((transaction) => {
      let stockSymbol = transaction.symbol;
      let transactionPrice = transaction.price;
      let stockQty = transaction.quantity;
      return (
        <li className="index-item">
          <div> BUY({stockSymbol}) - </div>
          <div>{stockQty} Share(s) @</div>
          <div>${transactionPrice}</div>
        </li>
      )
    });
    return trans.reverse();
  }

  
  render() {
    return (
      <div className="transaction-container">
        <div className="transaction-title">Transactions</div>
        <ul className="transaction-index">
          {this.props.transactions.length !== 0 ? this.renderTransactions() : <div>You have not made any transactions with your account.</div>}
        </ul>
      </div>
    )
  }
}
