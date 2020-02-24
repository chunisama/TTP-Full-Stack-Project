import React, { Component } from 'react'

export default class Transactions extends Component {

  componentDidMount(){
    this.props.fetchPortfolio(this.props.currentUser.id);
  }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = ' @ ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  formatDate(date){
    return date.toLocaleString().split(',')[0];
  }

  renderTransactions(){
    let trans = this.props.transactions.map((transaction) => {
      let stockSymbol = transaction.symbol;
      let transactionPrice = transaction.price;
      let stockQty = transaction.quantity;
      // debugger;
      let transactionDate = this.formatDate(new Date(transaction.date)).concat(this.formatAMPM(new Date (transaction.date)).toString());
      return (
        <li className="index-item">
          <div> BUY({stockSymbol}) </div>
          <div>{stockQty} Share(s) @</div>
          <div>${transactionPrice}</div>
          <div>{transactionDate}</div>
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
