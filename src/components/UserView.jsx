import PropTypes from "prop-types";
import PostCard from "./PostCard";
import { useEffect } from "react";

export default function UserView({ postsData, fetchData }) {
  useEffect(() => {
    console.log(postsData); // Check the structure of the postsData
  }, [postsData]);

  return (
    <div>
      <h2 className="text-center">Our Blogs</h2>
      {Array.isArray(postsData) && postsData.length > 0 ? (
        postsData.map((post) => (
          <PostCard key={post._id} postProp={post} fetchData={fetchData} />
        ))
      ) : (
        <p>No post available</p>
      )}
    </div>
  );
}

// PropTypes validation
UserView.propTypes = {
  postsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // MongoDB ObjectID as string
      title: PropTypes.string.isRequired, // Post title
      content: PropTypes.string.isRequired, // Post content
      author: PropTypes.string.isRequired, // Author name
      userId: PropTypes.string.isRequired, // ID of the user who posted
      createdOn: PropTypes.instanceOf(Date).isRequired, // Date when the post was created
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired, // Comment ID
          user: PropTypes.string.isRequired, // User who made the comment
          commentText: PropTypes.string.isRequired, // Comment text
          comentOn: PropTypes.instanceOf(Date).isRequired, // Date when the comment was made
        })
      ).isRequired,
    })
  ).isRequired,
};
