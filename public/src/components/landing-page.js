import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component{
  render(){
    return(
      <div>
        <h1>Phonebank</h1>
        <p className="lead">A phone banking solution powered by Twilio</p>
      </div>
    );
  };
}
