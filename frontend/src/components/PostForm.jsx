import { useState } from 'react';
import axios from 'axios';

const PostForm = ({ userId }) => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://deploy-hmbw.onrender.com/api/posts', {
        userId, // Pass the user ID
        topic,
        message
      });
      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error posting message', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
