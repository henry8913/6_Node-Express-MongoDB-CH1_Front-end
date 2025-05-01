import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = (props) => {
  const [user, setUser] = useState(null);

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
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/new" className="nav-link">
              New Post
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <div className="user-info me-3">
                  <i className="bi bi-person-circle me-2"></i>
                  {user?.name}
                </div>
                <Nav.Link
                  className="logout-link"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                >
                  Logout
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* 
          <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
          Nuovo Articolo
        </Button>
        */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
