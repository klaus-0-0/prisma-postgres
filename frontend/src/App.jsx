// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import TopicPage from './pages/TopicPage';
import './index.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const topics = ['Technology', 'Sports', 'Culture', 'Entertainment'];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <Navbar />
      <button className="toggle-button" onClick={toggleSidebar}>Toggle Topics</button>
      {showSidebar && <Sidebar topics={topics} />}
      <div className={`main-content ${showSidebar ? 'sidebar-visible' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          {topics.map((topic, index) => (
            <Route
              key={index}
              path={`/topics/${topic.toLowerCase()}`}
              element={<TopicPage topic={topic} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
