// src/components/Comment.jsx
// import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
    </div>
  );
};

// Adding PropTypes validation
Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
