import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Plus, Loader2, FileText } from "lucide-react";

// Components Import
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/notes");
      setNotes(Array.isArray(data) ? data : data.notes || []);
    } catch (error) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Could not delete note");
    }
  };

  const handleModalSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedNote) {
        await api.put(`/notes/${selectedNote._id}`, formData);
        toast.success("Note updated!");
      } else {
        await api.post("/notes", formData);
        toast.success("Note created!");
      }
      setIsModalOpen(false);
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreateModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your thoughts and tasks cleanly.</p>
          </div>
          <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl cursor-pointer">
            <Plus size={20} /> Add Note
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center bg-white border border-gray-200 border-dashed rounded-2xl p-12 mt-12 max-w-md mx-auto">
            <FileText size={40} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No notes yet</h3>
            <button onClick={openCreateModal} className="mt-4 text-blue-600 hover:underline">Create your first note</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onEdit={openEditModal} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedNote} 
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting} 
      />
    </div>
  );
};

export default Dashboard;