import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import AuthContext from '../context/AuthContext'; // Import the context
import PropTypes from 'prop-types'

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, { email, password });

      if (response.status === 200) {
        setMessage('Login successful');
        const userResponse = await axios.get(`${config.apiUrl}/auth/user`, { params: { email } });
        const userId = userResponse.data.id;
        console.log("loginnn = ", userId);
        login({ userId }); // Call the context login function
        onLogin()
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        setMessage(`Login error: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Login error: ${error.response?.data?.message || error.message}`);
      console.error('Login error:', error);
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
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
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
