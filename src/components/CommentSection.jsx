// CommentSection.jsx
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function CommentSection({ postId, comments, fetchData }) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to comment.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts/post/comments/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentText: newComment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        return response.json();
      })
      .then(() => {
        setNewComment(""); // Clear the input field
        fetchData(); // Refresh comments
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>{comment.user}</strong>: {comment.commentText}
            <p className="text-muted">
              {new Date(comment.comentOn).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      {user ? (
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId="commentText">
            <Form.Control
              as="textarea"
              value={newComment}
              onChange={handleCommentChange}
              rows={2}
              placeholder="Add a comment..."
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form>
      ) : (
        <p>You must be logged in to comment.</p>
      )}
    </div>
  );
}
