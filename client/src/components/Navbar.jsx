import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, StickyNote, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          

          <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <StickyNote className="w-6 h-6" /> MyNotes
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Admin Panel Button (Sirf admin ko dikhega) */}
            {user?.role === "admin" && (
              <Link 
                to="/admin"
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-lg transition-colors"
              >
                ⚙️ Admin Panel
              </Link>
            )}

            {/* User Info */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <User size={16} /> {user?.name} 
              <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full ml-1 font-semibold uppercase tracking-wider">
                {user?.role}
              </span>
            </div>

            {/* Logout Button */}
            <button 
              onClick={logout} 
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;