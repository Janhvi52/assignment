import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert('Please enter both email and password to register.');
      return;
    }
  
    // Check if the user is already registered
    const isUserRegistered = registeredUsers.some((user) => user.email === email);
  
    if (isUserRegistered) {
      alert('User already registered with this email. Please login instead.');
    } else {
      // Add the new registered user to the array
      setRegisteredUsers([...registeredUsers, { email, password }]);
      setIsRegisterMode(false);
      alert('Registration successful. You can now log in.');
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the user is registered
    const user = registeredUsers.find((user) => user.email === email && user.password === password);
    if (user) {
      // Redirect to ViewExpensePage after successful login
      navigate('/App');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      {isRegisterMode ? (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Register</h2>
          <form onSubmit={handleRegister}>
            {/* Registration form */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              Register
            </button>
            <p style={{ marginTop: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsRegisterMode(false)}>
              Already have an account? Login here.
            </p>
          </form>
        </>
      ) : (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Login</h2>
          <form onSubmit={handleLogin}>
            {/* Login form */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              Login
            </button>
            <p style={{ marginTop: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsRegisterMode(true)}>
              Don't have an account? Register here.
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
