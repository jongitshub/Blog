import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [about, setAbout] = useState<string>(''); // For editing the bio
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please login.');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setAbout(response.data.about || '');
      } catch (err: any) {
        console.error('Error fetching user profile:', err);
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setMessage(null);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      // Send PATCH request to update user's "about"
      const response = await axios.patch(
        'http://localhost:5000/api/users/profile',
        { about },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data.user;
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center p-6">
          <p className="text-gray-600">No user information found. Please login.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>

          {message && <p className="text-green-500 mb-4">{message}</p>}

          <div className="mb-4 space-y-2">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email || 'No email provided'}</p>
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          {/* About Me Section */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">
              About Me
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
