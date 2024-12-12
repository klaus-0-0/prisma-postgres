import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ topics }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Any logout logic (like clearing authentication tokens) can go here
    navigate('/'); // Navigate to the landing page
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="sidebar">
      <button className="home-button" onClick={handleLogout}>Log out</button>
      <button className="home-dashboard" onClick={handleHomeClick}>Home</button> {/* Home button */}
      <nav>
        <ul>
          {topics.map((topic, index) => (
            <li key={index}>
              <button onClick={() => navigate(`/topics/${topic.toLowerCase()}`)}>{topic}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sidebar;
