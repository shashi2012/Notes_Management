const Note = require("../models/note.model");

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });
    const note = await Note.create({ user: req.user._id, title, content });
    res.status(201).json(note);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };