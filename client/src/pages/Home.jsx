import { Link } from "react-router-dom";
import { Shield, Zap, Lock, ArrowRight, StickyNote } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar for Home */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-blue-600 font-extrabold text-2xl tracking-tight">
          <StickyNote className="w-8 h-8" /> MyNotes
        </div>
        <div className="flex gap-4">
          {user ? (
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-md flex items-center gap-2">
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <Link to="/login" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all shadow-md flex items-center gap-2">
              Login / Register <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-600 tracking-tight max-w-4xl leading-tight mb-6">
          Manage your notes, <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-red-500">
            securely & beautifully.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A simple and peaceful space to capture your ideas. Focus on your thoughts while we keep them perfectly organized and completely safe.
        </p>
        
        {/* Call to Action */}
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1">
              Get Started for Free
            </Link>
            <Link to="/login" className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-sm">
              I already have an account
            </Link>
          </div>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Zap size={32} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Quick & Seamless</h3>
            <p className="text-gray-500 text-sm">Write, save, and edit your notes instantly without any frustrating loading screens.</p>
          </div>
          <div className="p-6">
            <Shield size={32} className="text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Safe Workspace</h3>
            <p className="text-gray-500 text-sm">A highly secure environment built to protect your information and keep everything organized.</p>
          </div>
          <div className="p-6">
            <Lock size={32} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">100% Private</h3>
            <p className="text-gray-500 text-sm">Your thoughts belong to you. We make sure they stay strictly private and protected.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;