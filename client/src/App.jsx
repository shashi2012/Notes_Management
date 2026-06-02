import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
// loading spinner
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// PUBLIC ROUTE 
// Kaam: Agar user pehle se logged in hai, toh usko wapas Login/Register page par aane se roko aur direct Dashboard par bhej do.
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <LoadingScreen />;
  
  return user ? <Navigate to="/dashboard" replace /> : children;
};

//  PROTECTED ROUTE 
// Kaam: Agar user logged in NAHI hai, toh usko Dashboard dekhne se roko aur wapas Login par bhej do.
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <LoadingScreen />;
  
  return user ? children : <Navigate to="/login" replace />;
};

// ADMIN ROUTE
// Kaam: Agar user 'admin' NAHI hai, toh usko Admin Panel par aane se strictly roko aur Dashboard par bhej do.
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <LoadingScreen />;
  
  return (user && user.role === "admin") ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        
        <Routes>
          {/*HOME PAGE (Landing Page - Sabke liye open) */}
          <Route path="/" element={<Home />} />

          {/*  PUBLIC ROUTES (Login / Register) */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* USER DASHBOARD ROUTE  */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* ADMIN ROUTE  */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } 
          />

          {/*  CATCH-ALL (404) ROUTE */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;