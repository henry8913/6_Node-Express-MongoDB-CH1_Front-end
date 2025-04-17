
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import { API_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";

const NewBlogPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [cover, setCover] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
const [authorName, setAuthorName] = useState("");
const [authorAvatar, setAuthorAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    // Ottieni l'ultimo ID dai post esistenti e incrementa di 1
    const response = await fetch(`${API_URL}/posts`);
    const posts = await response.json();
    const maxId = Math.max(...posts.map(post => post._id), 0);
    const newId = maxId + 1;

    const newPost = {
      _id: newId,
      category,
      title,
      cover,
      readTime: {
        value: 5,
        unit: "minute"
      },
      author: {
        name: authorName,
        avatar: authorAvatar
      },
      content,
      createdAt: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    try {
      const postResponse = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      if (postResponse.ok) {
        navigate('/');
      } else {
        alert('Errore durante la pubblicazione del post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Errore durante la pubblicazione del post');
    }
  };

  return (
    <Container className="new-blog-container">
      <h2 className="text-center mb-4" style={{ color: '#2d3748', fontWeight: '800' }}>Crea Nuovo Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control 
            size="lg" 
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Testing</option>
            <option>DevOps</option>
            <option>Database</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>URL Immagine di Copertina</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="https://example.com/image.jpg"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-author-name" className="mt-3">
          <Form.Label>Nome Autore</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="Il tuo nome"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-author-avatar" className="mt-3">
          <Form.Label>URL Avatar Autore</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="https://example.com/avatar.jpg"
            value={authorAvatar}
            onChange={(e) => setAuthorAvatar(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button 
            type="reset" 
            size="lg" 
            variant="outline-dark"
            onClick={() => {
              setTitle("");
              setCategory("Frontend");
              setCover("");
              setEditorState(EditorState.createEmpty());
              setAuthorName("");
              setAuthorAvatar("");
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Pubblica
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
