// src/components/Sidebar.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = ({ topics }) => {
  return (
    <div className="sidebar">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <Link to={`/topics/${topic.toLowerCase()}`} key={index} className="topic-link" >{topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sidebar;
