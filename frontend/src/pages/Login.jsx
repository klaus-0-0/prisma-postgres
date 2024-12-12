import PropTypes from 'prop-types';
import { useState } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setMessage('Login successful!');
        onLogin(); // Update authentication state
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        const errorData = await response.json();
        setMessage(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error connecting to server');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    padding: '20px', // Ensure padding to avoid overlap
  },
  heading: {
    color: 'var(--text-color)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    color: 'var(--text-color)',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'var(--button-background-color)',
    color: 'var(--button-text-color)',
    cursor: 'pointer',
  },
  message: {
    color: 'var(--text-color)',
  },

};

export default Login;
