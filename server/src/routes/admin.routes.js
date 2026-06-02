const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { getAllUsers, getUserById, updateUserRole, getAllNotes, deleteAnyNote } = require("../controllers/admin.controller");

router.use(protect);
router.use(authorize("admin")); // Blocks non-admins entirely

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/role", updateUserRole);
router.get("/notes", getAllNotes);
router.delete("/notes/:id", deleteAnyNote);

module.exports = router;