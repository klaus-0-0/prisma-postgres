import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import PostForm from '../components/PostForm';
import PropTypes from 'prop-types';

const TopicPage = ({ topic }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/posts?topic=${topic}`);
      setPosts(response.data);
      console.log("topic-pagee = ", response.data)

    } catch (error) {
      console.error('Error fetching posts', error);
      setError('Error fetching posts');
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/auth/user`);
      setUserId(response.data.id);
      console.log("topicpagaess = ",response.data.id)
    } catch (error) {
      console.error('Error fetching user data', error);
      setError('Error fetching user data');
    }
  }; 

  useEffect(() => {
    fetchUserId(); // Fetch user data when component mounts
    fetchPosts();
  }, [topic]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{topic}</h1>
      <PostForm onPostCreated={fetchPosts} userId={userId} topic={topic} />
      <div style={styles.postContainer}>
        {error && <p style={styles.error}>{error}</p>}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.postBox}>
              <h3>{post.author.username}</h3>
              <h4>{post.title}</h4>
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
