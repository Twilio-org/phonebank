import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../containers/navigation';

export default class Header extends Component{
  render(){
    return(
      <header className="navbar navbar-light bg-faded">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link className="navbar-brand" to="/">Phonebank</Link>
            </div>
            <div className="col-md-8 pull-right">
              <Navigation />
            </div>
          </div>
        </div>
      </header>
    );
  };
}
