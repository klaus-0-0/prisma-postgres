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
      <h1>{topic}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicPage;
