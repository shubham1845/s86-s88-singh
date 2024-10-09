import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/Container";

import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Logout from "./pages/Logout";
import { UserProvider } from "./context/UserContext";
import Posts from "./pages/Posts";
import EditPost from "./components/EditPost";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    username: null,
    isAdmin: null,
  });

  // unsetUser function to clear localStorage and reset user
  function unsetUser() {
    console.log("Clearing user data and localStorage");
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      username: null,
      isAdmin: null,
    });
  }

  // Function to retrieve user details using token
  function retrieveUserDetails(token) {
    if (!token) {
      console.log("No token found in localStorage");
      unsetUser();
      return;
    }

    console.log("Fetching user details with token:", token);

    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching user details: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User details fetched:", data);
        if (data && data._id) {
          setUser({
            id: data._id,
            email: data.email,
            username: data.username,
            isAdmin: data.isAdmin,
          });
        } else {
          console.log("Invalid user data, clearing user.");
          unsetUser();
        }
      })
      .catch((err) => {
        console.error("Error occurred while fetching user details:", err);
        unsetUser();
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Current user in state:", user);
    console.log("Token from localStorage:", token);
    retrieveUserDetails(token);
  }, []);
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<Login />} />

              <Route path="/posts" element={<Posts />} />
              <Route path="/addPost" element={<AddPost />} />

              <Route path="/logout" element={<Logout />} />
              <Route path="/posts/update/:postId" element={<EditPost />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
