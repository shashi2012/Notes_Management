import { Shield, Trash2, User, Clock } from "lucide-react";

const AdminNoteCard = ({ note, users = [], onDelete }) => {
  //  Find Author Name ( Works whether backend sends User ID or User Object)
  const noteAuthor = users.find((u) => 
    u._id === (typeof note.user === 'object' ? note.user?._id : note.user)
  );
  const authorName = noteAuthor ? noteAuthor.name : "Unknown Author";

  //  Format the Date 
  const formattedDate = note.createdAt 
    ? new Date(note.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
      })
    : "Unknown Date";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 relative group animate-in fade-in zoom-in-95 duration-300 flex flex-col h-full">
      <div className="absolute -top-3 -right-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
        <Shield size={12} /> Admin View
      </div>
      
      {/* Title & Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 break-words pr-4">{note.title}</h3>
        <p className="text-gray-600 text-sm whitespace-pre-wrap break-words">
          {note.content || note.description}
        </p>
      </div>
      
      {/*  NEW: User & Date Info Box */}
      <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-800 font-medium mb-1.5">
          <User size={14} className="text-indigo-500" />
          {authorName}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} className="text-gray-400" />
          {formattedDate}
        </div>
      </div>
      
      {/* Footer / Action */}
      <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center">
        <span className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
          ID: {note._id.slice(-6)}
        </span>
        <button 
          onClick={() => onDelete(note._id)}
          className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 size={16} /> Force Delete
        </button>
      </div>
    </div>
  );
};

export default AdminNoteCard;