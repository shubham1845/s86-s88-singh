import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf"; // Make sure you have notyf installed for notifications
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notyf = new Notyf();
  const { user } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    if (title !== "" && content !== "" && author !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [title, content, author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/addPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
            author,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const data = await response.json();
      notyf.success("New Post Created");
      navigate("/posts"); // Redirect to the posts page or another desired page
    } catch (error) {
      notyf.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
