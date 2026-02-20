import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaArrowLeft } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-accent-purple/5 to-accent-blue/5 animate-gradient"></div>
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 
                   hover:text-white transition-colors group z-10"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-dark-800">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-purple 
                          rounded-2xl flex items-center justify-center mx-auto mb-4
                          transform hover:scale-110 transition-transform duration-300">
              <GiBrain className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold">
              <span className="text-gradient">Welcome</span> Back
            </h2>
            <p className="text-gray-400 mt-2">Sign in to continue learning</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 
                          rounded-xl mb-6 text-sm animate-pulse-slow">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500 group-focus-within:text-accent-blue transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500 group-focus-within:text-accent-blue transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 
                           hover:text-accent-blue transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox bg-dark-800 border-dark-700 
                                                 rounded text-accent-blue focus:ring-accent-blue" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-accent-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       relative overflow-hidden group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-800 
                         hover:bg-dark-700 rounded-xl transition-all duration-300
                         border border-dark-700 hover:border-accent-blue/50 group"
              >
                <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-300">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-800 
                         hover:bg-dark-700 rounded-xl transition-all duration-300
                         border border-dark-700 hover:border-accent-purple/50 group"
              >
                <FaGithub className="text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                <span className="text-sm text-gray-300">GitHub</span>
              </button>
            </div>
          </form>

          <p className="text-center mt-8 text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-blue hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;