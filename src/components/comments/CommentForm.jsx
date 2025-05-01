
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './styles.css';
import { API_URL } from '../../config/config';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user) {
      setError('Devi effettuare il login per commentare');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogPosts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: comment,
          author: user.name,
          createdAt: new Date().toLocaleDateString()
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        onCommentAdded(newComment);
        setComment('');
        setError('');
      } else {
        setError('Errore durante l\'invio del commento');
      }
    } catch (error) {
      setError('Errore durante l\'invio del commento');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="comment-form">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Invia Commento
      </Button>
    </Form>
  );
};

export default CommentForm;
