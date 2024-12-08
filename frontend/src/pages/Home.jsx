import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <PostForm fetchPosts={fetchPosts} />
      <div className="post-container">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post-box">
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

export default Home;
