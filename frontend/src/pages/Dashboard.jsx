import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config';
// import PostForm from '../components/PostForm';

const Dashboard = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  console.log("dashbowrdd = ", userId)

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
      setError('Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <p>User ID: {userId}</p>
      {/* <PostForm userId={userId} onPostCreated={fetchPosts} /> */}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.postContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.postBox}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  userId: PropTypes.number.isRequired,
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

export default Dashboard;
