import Navbar from '../components/Navbar';  // Import Navbar
import PostList from '../components/PostList'; // Import PostList
import BlogPostForm from '../components/BlogPostForm';  // Import BlogPostForm

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar /> {/* Render Navbar component here */}
      
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <BlogPostForm /> {/* Render BlogPostForm component here */}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
          <PostList /> {/* Render PostList component here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
