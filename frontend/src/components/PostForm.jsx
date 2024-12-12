import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const PostForm = ({ fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [authorId, setAuthorId] = useState(1); // Replace with actual logic to get authorId

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/posts`, {
        title,
        content,
        topic,
        authorId
      });

      if (response.status === 201) {
        fetchPosts(); // Refresh posts after successful post creation
        setTitle('');
        setContent('');
        setTopic('');
      } else {
        console.error('Error posting message:', response.data.message);
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author ID:</label>
        <input
          type="number"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
