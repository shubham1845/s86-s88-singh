import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function EditPost() {
  const notyf = new Notyf();

  const { postId } = useParams(); // Get postId from URL params
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the post data to edit
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/post/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data to inspect it
        if (data && data.post) {
          setPostDetails({
            title: data.post.title,
            content: data.post.content,
            author: data.post.author,
          });
          setIsLoading(false);
        } else {
          notyf.error("Failed to load post details.");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        notyf.error("Failed to load post details.");
        setIsLoading(false);
      });
  }, [postId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      notyf.error("You need to be logged in to update a post.");
      return;
    }

    try {
      fetch(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify(postDetails),
      })
        .then((response) => {
          if (!response.ok) {
            // Check if response status is not ok
            throw new Error("Failed to update post. Please try again.");
          }
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          console.log(data); // Log response data to inspect
          if (data.post) {
            notyf.success("Post updated successfully!");
            navigate(`/posts`); // Redirect to posts page after successful update
          } else {
            notyf.error(data.message || "Failed to update post.");
          }
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          notyf.error("Error updating post. Please try again.");
        });
    } catch (error) {
      console.error("Error submitting update request:", error);
      notyf.error("Error updating post. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPostTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postDetails.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPostContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={postDetails.content}
            onChange={handleChange}
            rows={5}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPostAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={postDetails.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Post
        </Button>
        {/* <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button> */}
      </Form>
    </div>
  );
}
