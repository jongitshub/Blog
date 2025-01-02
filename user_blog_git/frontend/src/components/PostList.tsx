import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from './Avatar'; // Import the Avatar component

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Error fetching posts.');
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="my-8">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* If your post includes a user object with avatarUrl and username fields */}
              <div className="p-4 flex items-center space-x-3">
                <Avatar
                  avatarUrl={post.user?.avatarUrl}
                  userName={post.user?.username}
                  size={40}
                />
                <span className="text-sm text-gray-700">
                  {post.user?.username || 'Unknown'}
                </span>
              </div>
              <img
                src="https://via.placeholder.com/400x200"
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="mt-2 text-gray-600">{post.content.slice(0, 100)}...</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
