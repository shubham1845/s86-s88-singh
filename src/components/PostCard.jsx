import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import DeletePost from "./DeletePost";
import CommentSection from "./CommentSection";

export default function PostCard({ postProp, fetchData }) {
  const { user } = useContext(UserContext); // Access user context
  const { _id, title, content, author, createdOn } = postProp;

  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const canEdit = user && token;

  return (
    <Card className="cardHighlight mx-2 mb-4 shadow-sm border-0 h-100">
      <Card.Body>
        <Card.Title className="font-weight-bold">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Content:</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Author:</Card.Subtitle>
        <Card.Text>{author}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Posted on:</Card.Subtitle>
        <Card.Text>{new Date(createdOn).toLocaleDateString()}</Card.Text>
        {token && (
          <CommentSection
            postId={_id}
            comments={postProp.comments}
            fetchData={fetchData}
          />
        )}
        <Link className="btn btn-primary" to={`/posts/${_id}`}>
          Details
        </Link>

        {/* Conditionally render the Edit button if the user is authorized */}
        {canEdit && (
          <>
            <Link className="btn btn-warning ms-2" to={`/posts/update/${_id}`}>
              Edit
            </Link>
            <DeletePost postId={_id} fetchData={fetchData} />
          </>
        )}
      </Card.Body>
    </Card>
  );
}

// Prop type validation
PostCard.propTypes = {
  postProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdOn: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};
