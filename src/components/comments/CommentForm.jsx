
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './styles.css';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: comment,
          author: author,
          createdAt: new Date().toLocaleDateString()
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        onCommentAdded(newComment);
        setComment('');
        setAuthor('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="comment-form">
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>
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
