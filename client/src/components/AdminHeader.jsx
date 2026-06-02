import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <nav className="bg-indigo-900 text-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 font-bold text-xl">
          <Shield className="text-indigo-300" /> Admin Command Center
        </div>
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to My Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default AdminHeader;