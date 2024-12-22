// pending...
import { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { v4 as uuidv4 } from 'uuid';

const CommentSection = ({ postId, comments, addComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { id: uuidv4(), postId, text };
    addComment(newComment);
    setText('');
  };

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

// Adding PropTypes validation
CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  addComment: PropTypes.func.isRequired,
};

export default CommentSection;
