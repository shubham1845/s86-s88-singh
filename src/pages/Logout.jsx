import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useEffect, useContext } from "react";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);

  unsetUser();

  // localStorage.clear();
  useEffect(() => {
    setUser({
      id: null,
      email: null,
      username: null,
      isAdmin: null,
    });
  });
  // Redirect back to login
  return <Navigate to="/login" />;
}
