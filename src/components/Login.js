import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
      // Store login details in cookie
      Cookies.set('loggedInUser', JSON.stringify({ email: user.email, loginDate: new Date().toISOString() }));
      // Redirect to ViewExpensePage after successful login
      navigate('/App');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md">
      {isRegisterMode ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister} className="mb-4">
            {/* Registration form */}
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Register
            </button>
            <p className="text-center mt-2 text-blue-600 cursor-pointer" onClick={() => setIsRegisterMode(false)}>
              Already have an account? Login here.
            </p>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="mb-4">
            {/* Login form */}
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Login
            </button>
            <p className="text-center mt-2 text-blue-600 cursor-pointer" onClick={() => setIsRegisterMode(true)}>
              Don't have an account? Register here.
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
