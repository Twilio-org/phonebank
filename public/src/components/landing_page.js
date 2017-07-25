import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap'
export default class LandingPage extends Component{
  
  render(){
  const id = 31;
    return(
      <div>
        <PageHeader>Phonebank</PageHeader>
        <p className="lead">A phone banking solution powered by Twilio</p>
        <div>
          <Link to={`/account/${id}`}>View Account Details</Link>
        </div>
      </div>
    );
  };
}
