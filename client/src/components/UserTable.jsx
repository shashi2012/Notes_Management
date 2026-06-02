import { Eye } from "lucide-react";

const UserTable = ({ users, currentUser, onViewNotes }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <th className="p-4 font-semibold text-sm">Name</th>
            <th className="p-4 font-semibold text-sm">Email</th>
            <th className="p-4 font-semibold text-sm">Role</th>
            <th className="p-4 font-semibold text-sm text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">
                {u.name} {u._id === currentUser._id && <span className="ml-2 text-xs text-indigo-500 font-normal italic">(You)</span>}
              </td>
              <td className="p-4 text-gray-600">{u.email}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${u.role === "admin" ? "bg-indigo-100 text-indigo-700" : "bg-green-100 text-green-700"}`}>
                  {u.role}
                </span>
              </td>
              <td className="p-4 flex items-center justify-center">
                <button 
                  onClick={() => onViewNotes(u)}
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  title="View User's Notes"
                >
                  <Eye size={16} /> View Notes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;