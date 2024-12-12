import { useState, useEffect } from 'react';
import config from '../config';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for changes in the theme and update CSS variables accordingly
    const root = document.documentElement;

    root.style.setProperty('--background-color', getComputedStyle(root).getPropertyValue('--background-color'));
    root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color'));
    root.style.setProperty('--button-background-color', getComputedStyle(root).getPropertyValue('--button-background-color'));
    root.style.setProperty('--button-text-color', getComputedStyle(root).getPropertyValue('--button-text-color'));
    root.style.setProperty('--button-hover-background-color', getComputedStyle(root).getPropertyValue('--button-hover-background-color'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          topic,
          authorId: 1 // Ensure this is set correctly
        })
      });

      if (response.ok) {
        setMessage('Post created successfully');
        setTitle('');
        setContent('');
        setTopic('');
      } else {
        const errorData = await response.json();
        setMessage(`Error posting message: ${errorData.message}`);
        console.error('Error posting message:', errorData);
      }
    } catch (error) {
      setMessage('Error connecting to server');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Topic:</label>
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
      {message && <p style={styles.message}>{message}</p>}
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
    backgroundColor: 'var(--background-color)'
  },
  heading: {
    color: 'var(--text-color)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    color: 'var(--text-color)'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)'
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'var(--button-background-color)',
    color: 'var(--button-text-color)',
    cursor: 'pointer'
  },
  message: {
    color: 'var(--text-color)'
  }
};

export default PostForm;
