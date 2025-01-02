import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome to BlogApp</h2>
        <AuthForm />
      </div>
    </div>
  );
}
