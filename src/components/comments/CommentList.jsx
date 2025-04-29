
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './styles.css';

const CommentList = ({ comments }) => {
  return (
    <ListGroup className="comment-list">
      {comments && comments.map((comment) => (
        <ListGroup.Item key={comment._id} className="comment-item">
          <div className="comment-header">
            <strong>{comment.author}</strong>
            <span className="comment-date">{comment.createdAt}</span>
          </div>
          <div className="comment-text">{comment.text}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
