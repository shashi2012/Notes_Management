import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Users, StickyNote, Loader2, ArrowLeft } from "lucide-react";

import AdminHeader from "../components/AdminHeader";
import UserTable from "../components/UserTable";
import AdminNoteCard from "../components/AdminNoteCard";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");
  
  const [allUsers, setAllUsers] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersRes, notesRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/notes")
      ]);
      setAllUsers(usersRes.data);
      setAllNotes(notesRes.data);
    } catch (error) {
      toast.error("Error fetching admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Admin Action: Delete this note permanently?")) return;

    try {
      await api.delete(`/admin/notes/${noteId}`);
      toast.success("Note forcefully deleted");
      setAllNotes(allNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      toast.error("Could not delete note");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );
  }

  const filteredUserNotes = selectedUser 
    ? allNotes.filter(note => note.user === selectedUser._id || note.user?._id === selectedUser._id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
          <button 
            onClick={() => handleTabChange("users")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${activeTab === "users" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            <Users size={18} /> Manage Users ({allUsers.length})
          </button>
          <button 
            onClick={() => handleTabChange("notes")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${activeTab === "notes" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            <StickyNote size={18} /> All System Notes ({allNotes.length})
          </button>
        </div>

        {activeTab === "users" ? (
          selectedUser ? (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div>
                  <h2 className="text-xl font-bold text-indigo-900">Notes by {selectedUser.name}</h2>
                  <p className="text-sm text-indigo-700">{selectedUser.email}</p>
                </div>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-100 transition-colors border border-indigo-200 cursor-pointer"
                >
                  <ArrowLeft size={18} /> Back to Users
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUserNotes.length === 0 ? (
                  <p className="text-gray-500 italic col-span-full">This user has not created any notes yet.</p>
                ) : (
                  filteredUserNotes.map((note) => (
                    <AdminNoteCard key={note._id} note={note} users={allUsers} onDelete={handleDeleteNote} />
                  ))
                )}
              </div>
            </div>
          ) : (
            <UserTable 
              users={allUsers} 
              currentUser={user} 
              onViewNotes={setSelectedUser} 
            />
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes.length === 0 ? (
              <p className="text-gray-500 italic col-span-full">No notes in the system yet.</p>
            ) : (
              allNotes.map((note) => (
                <AdminNoteCard key={note._id} note={note} users={allUsers} onDelete={handleDeleteNote} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;