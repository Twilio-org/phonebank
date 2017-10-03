import React from 'react';
import { Col } from 'react-bootstrap';
import logo from '../../assets/Powered-by-Twilio.png';

const Footer = () => (
  <footer className="navbar-fixed-bottom">
    <Col md={12}>
      <img src={logo} alt="Powered by Twilio" />
    </Col>
  </footer>
);


export default Footer;
