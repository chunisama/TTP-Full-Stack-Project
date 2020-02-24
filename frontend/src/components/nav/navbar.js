import React from 'react';
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="nav-container">
                <Link className="links" to={'/portfolio'}>Portfolio</Link>
                <Link className="links" to={'/transactions'}>Transactions</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className="splash-nav-container">
                <Link className="links" to={'/signup'}>Signup</Link>
                <Link className="links" to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="header-container">
            <h1 className="header">TTP Full Stack</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;