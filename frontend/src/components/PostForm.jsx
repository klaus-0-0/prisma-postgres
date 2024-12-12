import { useState } from 'react';
import axios from 'axios';

const PostForm = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://deploy-hmbw.onrender.com/api/posts', {
        userId, // Ensure userId is passed
        title,  // Ensure title is included
        topic,
        content // Ensure content is included
      });
      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
