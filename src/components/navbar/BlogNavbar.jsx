
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <Navbar expand="lg" className={`blog-navbar ${scrolled ? 'scrolled' : ''}`} fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Link to="/" className="nav-link">
              <i className="bi bi-house-door"></i>
              <span>Home</span>
            </Link>
            <Link to="/new" className="nav-link">
              <i className="bi bi-plus-circle"></i>
              <span>New Post</span>
            </Link>
            {!user ? (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link login-btn">
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Login</span>
                </Link>
                <Link to="/register" className="nav-link register-btn">
                  <i className="bi bi-person-plus"></i>
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="user-section">
                <div className="user-info">
                  <i className="bi bi-person-circle"></i>
                  <span>{user.name}</span>
                </div>
                <Nav.Link
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
