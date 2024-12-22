import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  // Function to log in the user and set the user state
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out the user and clear the user state
  const logout = () => {
    setUser(null);
  };

  return (
    // Provide the user, login, and logout functions to the context consumers
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
};

// Prop type validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export the context for use in other components
export default AuthContext;
