import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const TopicPage = ({ topic }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/posts?topic=${topic.toLowerCase()}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, [topic]);

  return (
    <div>
      <h1>{topic} Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p><strong>Topic:</strong> {post.topic}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default TopicPage;
