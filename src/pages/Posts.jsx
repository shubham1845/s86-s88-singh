import React, { useEffect, useState, useContext } from "react";
import PostCard from "../components/PostCard";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";

export default function Products() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Uncommented to use the context
  const [posts, setPosts] = useState([]);

  // Fetch posts data from API
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/all-posts`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        }
      })
      .catch((error) => console.error("Error fetching postss:", error));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {user && user.isAdmin ? (
        <AdminView fetchData={fetchData} postsData={posts} />
      ) : (
        <UserView postsData={posts} fetchData={fetchData} />
      )}
    </>
  );
}
