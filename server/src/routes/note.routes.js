const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require("../controllers/note.controller");

router.use(protect); // Protects all routes declared below

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;