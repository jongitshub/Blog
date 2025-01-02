import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  let user: any = null;
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left side: link back to the home or dashboard */}
      <Link to="/dashboard" className="text-xl font-bold hover:text-gray-200">
        MyBlog
      </Link>

      {/* Right side: user info / logout */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            {/* Optionally add an avatar if you have user.avatarUrl */}
            <span>Hello, {user.username}</span>
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        )}
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
