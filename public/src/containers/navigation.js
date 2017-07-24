import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

class Navigation extends Component{
  render(){
    return(
      <div className="dropdown show">
        <a className="btn btn-secondary dropdown-toggle" href="/" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="/registration">Register</a>
        </div>
      </div>
    );
  }
}

export default Navigation;
