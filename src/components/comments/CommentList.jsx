import React, { useState } from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import { API_URL } from "../../config/config";
import "./styles.css";

const CommentList = ({ comments, postId, onCommentUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEdit = async (commentId) => {
    if (editingId === commentId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token non trovato");
          return;
        }

        const commentToUpdate = comments.find(c => c._id === commentId);

        if (!commentToUpdate) {
          console.error("Commento non trovato");
          return;
        }

        const response = await fetch(
          `${API_URL}/blogPosts/${postId}/comment/${commentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text: editText }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to update comment');
        }

        onCommentUpdate(commentId, data);
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.error("Error updating comment:", error.message);
      }
    } else {
      setEditingId(commentId);
      const comment = comments.find((c) => c._id === commentId);
      setEditText(comment.text);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/blogPosts/${postId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        onCommentUpdate(commentId, null);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <ListGroup className="comment-list">
      {comments &&
        comments.map((comment, index) => (
          <ListGroup.Item key={`${comment._id}-${index}`} className="comment-item">
            <div className="comment-header">
              <strong>{comment.author}</strong>
              <span className="comment-date">{comment.createdAt}</span>
            </div>
            {editingId === comment._id ? (
              <Form.Control
                as="textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-comment-input"
              />
            ) : (
              <div className="comment-text">{comment.text}</div>
            )}
            {user && user.name === comment.author && (
              <div className="comment-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(comment._id)}
                >
                  {editingId === comment._id ? "Save" : "Edit"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default CommentList;