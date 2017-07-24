import React, { Component } from 'react';
import Header from './header'

export default class App extends Component {
  render(){
    return(
      <div>
        <Header />
        <section id="content">
          <div className="container">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}
