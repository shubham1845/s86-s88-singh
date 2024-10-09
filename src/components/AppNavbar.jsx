import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const location = useLocation(); // Hook to get the current path
  console.log(user);

  return (
    <>
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
            My-Blogs
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/posts" className="nav-link">
                Posts
              </Nav.Link>
              {/* 
              {user?.isAdmin && (
                <Nav.Link as={NavLink} to="/addProduct" className="nav-link">
                  Add Products
                </Nav.Link>
              )} */}
            </Nav>

            <Nav className="ms-auto">
              {user.id != (null || undefined) ? (
                <>
                  <Nav.Link as={NavLink} to="/addPost" className="nav-link">
                    Add Post
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile" className="nav-link">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" className="nav-link">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/register" className="nav-link">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login" className="nav-link">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
