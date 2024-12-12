import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import PropTypes from 'prop-types';
import PostForm from '../components/PostForm';

const TopicPage = ({ topic }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/posts`);
      const filteredPosts = response.data.filter(post => post.topic && post.topic.toLowerCase() === topic.toLowerCase());
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [topic]);

  return (
    <div>
      <h1>{topic}</h1>
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
          <p>No posts available for this topic.</p>
        )}
      </div>
    </div>
  );
};

TopicPage.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default TopicPage;
