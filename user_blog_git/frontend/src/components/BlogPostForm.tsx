import { useState } from 'react';
import axios from 'axios';

export default function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Post created!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <textarea
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Create Post
      </button>
    </form>
  );
}
