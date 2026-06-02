const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" } // Role-based requirement
  },
  { timestamps: true }
);

// Built-in Password Hashing before saving to DB
// Modern Async Mongoose Hook (No 'next' needed!)
userSchema.pre("save", async function () {
  // Just return to break out of the function early
  if (!this.isModified("password")) return; 
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // The promise resolves automatically here, moving to the next step!
});
// Helper method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);