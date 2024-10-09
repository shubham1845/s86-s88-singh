import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
// import EditProduct from "./EditProduct";
// import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ fetchData, postsData }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Set the products state with the imported productsData
    setPosts(postsData);
  }, [postsData]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            {/* <th>Availability</th> */}
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post._id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.author}</td>

              <td className="text-center">
                <DeletePost postId={post._id} fetchData={fetchData} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
