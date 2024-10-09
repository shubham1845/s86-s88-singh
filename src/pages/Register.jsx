import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const notyf = new Notyf();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== "" && username !== "" && password.length >= 8) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, username, password]);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error registering user");
        }
        return res.json();
      })
      .then((data) => {
        notyf.success("User registered successfully!");
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        notyf.error(err.message || "Registration failed");
      });
  }

  return (
    <>
      <Form className="p-5" onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password (min 8 characters)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isActive ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="danger" type="submit" disabled>
            Submit
          </Button>
        )}
      </Form>
      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
