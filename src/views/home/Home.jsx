import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row className="mb-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Cerca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select 
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Cerca per titolo</option>
            <option value="author">Cerca per autore</option>
          </Form.Select>
        </Col>
      </Row>
      <BlogList searchQuery={searchQuery} searchType={searchType} />
    </Container>
  );
};

export default Home;