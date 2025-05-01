import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementare la logica per la newsletter
    setEmail("");
    alert("Grazie per l'iscrizione alla newsletter!");
  };

  return (
    <>
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1>Scopri il Futuro della Tecnologia</h1>
              <p className="hero-text">
                Immergiti in articoli avvincenti, condividi le tue idee e rimani
                sempre al passo con le ultime innovazioni tech.
              </p>
              <Button variant="light" size="lg" href="#blog-section">
                Scopri gli Articoli
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid="sm" id="blog-section">
        <div className="search-section">
          <h2>Esplora gli Articoli</h2>
          <Row className="mb-4 mt-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </Col>
            <Col md={4}>
              <div className="dropdown-wrapper">
                <button 
                  className="dropdown-toggle" 
                  onClick={(e) => {
                    e.currentTarget.nextElementSibling.classList.toggle('show');
                  }}
                >
                  {searchType === 'title' ? 'Cerca per titolo' : 'Cerca per autore'}
                </button>
                <div className="dropdown-menu">
                  <div 
                    className="dropdown-item" 
                    onClick={() => setSearchType('title')}
                  >
                    Cerca per titolo
                  </div>
                  <div 
                    className="dropdown-item" 
                    onClick={() => setSearchType('author')}
                  >
                    Cerca per autore
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <BlogList searchQuery={searchQuery} searchType={searchType} />

        <div className="newsletter-section">
          <h2>Iscriviti alla Newsletter</h2>
          <p>
            Resta aggiornato sui nuovi articoli e ricevi contenuti esclusivi!
          </p>
          <Form onSubmit={handleNewsletterSubmit}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="primary" className="ms-2">
                    Iscriviti
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Home;
