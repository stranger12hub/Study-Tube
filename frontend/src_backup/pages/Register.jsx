import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaGithub, 
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        number: /\d/.test(value),
        special: /[!@#$%^&*]/.test(value),
        uppercase: /[A-Z]/.test(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthScore = () => {
    const { length, number, special, uppercase } = passwordStrength;
    return [length, number, special, uppercase].filter(Boolean).length;
  };

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore();
    if (score === 0) return 'bg-gray-700';
    if (score <= 2) return 'bg-red-500';
    if (score === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-accent-blue/5 to-accent-purple/5 animate-gradient"></div>
      
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
            <div className="w-20 h-20 bg-gradient-to-br from-accent-purple to-accent-blue 
                          rounded-2xl flex items-center justify-center mx-auto mb-4
                          transform hover:scale-110 transition-transform duration-300">
              <GiBrain className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold">
              <span className="text-gradient">Create</span> Account
            </h2>
            <p className="text-gray-400 mt-2">Join StudyTube today</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 
                          rounded-xl mb-6 text-sm animate-pulse-slow">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500 group-focus-within:text-accent-blue transition-colors" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength="3"
                  className="input-field pl-10"
                  placeholder="johndoe"
                />
              </div>
            </div>

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
                  minLength="6"
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

              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-full rounded-full transition-all duration-300 ${
                          i <= getPasswordStrengthScore() 
                            ? getPasswordStrengthColor() 
                            : 'bg-dark-800'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {passwordStrength.length ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaTimesCircle className="text-gray-600" />
                      }
                      <span className="text-gray-400">8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.number ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaTimesCircle className="text-gray-600" />
                      }
                      <span className="text-gray-400">Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.special ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaTimesCircle className="text-gray-600" />
                      }
                      <span className="text-gray-400">Special char</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordStrength.uppercase ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaTimesCircle className="text-gray-600" />
                      }
                      <span className="text-gray-400">Uppercase</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500 group-focus-within:text-accent-blue transition-colors" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 
                           hover:text-accent-blue transition-colors"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                required
                className="mt-1 form-checkbox bg-dark-800 border-dark-700 
                         rounded text-accent-blue focus:ring-accent-blue"
              />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-accent-blue hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       relative overflow-hidden group mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-900 text-gray-400">Or sign up with</span>
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
            Already have an account?{' '}
            <Link to="/login" className="text-accent-blue hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;