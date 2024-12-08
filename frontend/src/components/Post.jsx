// src/components/Post.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const Post = ({ post, onLike, onDislike }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    onLike(post.id);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    onDislike(post.id);
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like {likeCount}</button>
      <button onClick={handleDislike}>Dislike {dislikeCount}</button>
    </div>
  );
};

// Add prop types validation
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default Post;
