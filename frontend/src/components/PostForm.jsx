import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config';
import AuthContext from '../context/AuthContext'; // Import the context

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext); // Use the context to get the user

  console.log("auth = ", user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage('User not logged in');
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/posts`, {
        title,
        content,
        authorId: user.userId, // Use userId from the context
      });

      if (response.status === 200) {
        setMessage('Post created successfully');
        setTitle('');
        setContent('');
        onPostCreated();
      } else {
        setMessage(`Error creating post: ${response.data.error}`);
      }
    } catch (error) {
      setMessage(`Error creating post: ${error.response?.data?.message || error.message}`);
      console.error('Error creating post:', error);
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
        <button type="submit" style={styles.button}>Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

PostForm.propTypes = {
  onPostCreated: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--background-color)',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'var(--button-background-color)',
    color: 'var(--button-text-color)',
    cursor: 'pointer',
  },
  message: {
    color: 'var(--text-color)',
  },
};

export default PostForm;
