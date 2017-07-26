import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <section id="content">
          <Grid>
            {this.props.children}
          </Grid>
        </section>
      </div>
    );
  }
}
