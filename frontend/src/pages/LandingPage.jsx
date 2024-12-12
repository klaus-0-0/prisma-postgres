import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h2>Welcome! Please choose an option:</h2>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/signup" style={styles.button}>Sign Up</Link>
      </div>
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
    backgroundColor: '#f0f0f0'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
  }
};

export default LandingPage;
