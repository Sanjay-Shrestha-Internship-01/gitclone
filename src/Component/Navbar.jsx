import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
          <div className="navbar-left">
              <div>
                  <input className="nav-input" type="text" placeholder="Search or jump to..." />
                  <button className="nav-input-button">/</button>
              </div>
              <div>
                  <ul className="nav-list">
                      <li className="nav-list-items">Pull requests</li>
                      <li className="nav-list-items">Issues</li>
                      <li className="nav-list-items">Marketplace</li>
                      <li className="nav-list-items">Explore</li>
                  </ul>
              </div>
          </div>

          <div></div>
      </div>
    );
  }
}
