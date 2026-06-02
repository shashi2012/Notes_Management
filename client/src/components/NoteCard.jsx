import { Edit3, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow group">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 break-words pr-8">{note.title}</h3>
        <p className="text-gray-600 text-sm whitespace-pre-wrap break-words">
          {note.content || note.description}
        </p>
      </div>
      
      <div className="flex justify-end gap-2 mt-6 border-t border-gray-100 pt-4">
        <button 
          onClick={() => onEdit(note)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          title="Edit Note"
        >
          <Edit3 size={16} />
        </button>
        <button 
          onClick={() => onDelete(note._id)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete Note"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;