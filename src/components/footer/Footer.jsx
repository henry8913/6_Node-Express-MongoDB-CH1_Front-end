
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Un blog dedicato alla tecnologia e all'innovazione. Esplora le ultime novità del mondo tech.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/new">Nuovo Post</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registrati</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="social-links">
              <a href="#"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="copyright-text">
              Copyright &copy; {new Date().getFullYear()} Tech Blog. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
