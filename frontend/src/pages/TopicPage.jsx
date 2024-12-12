import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import PropTypes from 'prop-types';
import PostForm from '../components/PostForm';

const TopicPage = ({ topic }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/posts?topic=${topic}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
      setError('Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [topic]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{topic}</h1>
      <PostForm fetchPosts={fetchPosts} />
      <div style={styles.postContainer}>
        {error && <p style={styles.error}>{error}</p>}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.postBox}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
            </div>
          ))
        ) : (
          <p>No posts available for this topic.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  },
  heading: {
    color: 'var(--text-color)',
  },
  postContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  postBox: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  },
  error: {
    color: 'red',
  },
};

TopicPage.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default TopicPage;
