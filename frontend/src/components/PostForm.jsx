import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PostForm = ({ fetchPosts }) => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', { topic, message });
      setTopic('');
      setMessage('');
      fetchPosts();
    } catch (error) {
      console.error('Error posting message', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

PostForm.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
};

export default PostForm;
