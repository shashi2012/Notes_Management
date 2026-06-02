const User = require("../models/user.model");
const Note = require("../models/note.model");

const getAllUsers = async (req, res) => {
  try { const users = await User.find({}).select("-password"); res.json(users); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = req.body.role || user.role;
    await user.save();
    res.json({ message: `User role updated to ${user.role}` });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllNotes = async (req, res) => {
  try { const notes = await Note.find({}).populate("user", "name email"); res.json(notes); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteAnyNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note permanently deleted by Admin" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getAllUsers, getUserById, updateUserRole, getAllNotes, deleteAnyNote };