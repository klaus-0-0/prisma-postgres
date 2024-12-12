import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      topic,
      authorId: 1 // Ensure this is set correctly
    };

    try {
      const response = await axios.post(`${config.apiUrl}/posts`, postData);

      if (response.status === 201) {
        setMessage('Post created successfully');
        setTitle('');
        setContent('');
        setTopic('');
      } else {
        setMessage(`Error posting message: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error posting message: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#00BFFF',
    color: 'white',
    cursor: 'pointer'
  }
};

export default PostForm;
