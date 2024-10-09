import { Button } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function DeletePost({ postId, fetchData }) {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);

  // Check if user is the author or an admin
  const canEdit = user && (user.isAdmin || user._id === postId);

  const handleDelete = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      notyf.error("You need to be logged in to delete a post.");
      return;
    }

    //
    fetch(`${import.meta.env.VITE_API_URL}/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Add content type
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.message) {
          notyf.success(data.message || "Post deleted successfully");
        } else {
          notyf.error(data.message || "Something went wrong");
        }
        fetchData(); // Refresh the course list
      })
      .catch((err) => {
        notyf.error("Failed to delete the post");
      });
  };
  return (
    <Button variant={"danger"} size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
}
