import express from "express";
import mongoose from "mongoose";
// Create Express application
const app = express();
const port = 3002;

// Connect to MongoDB
mongoose.connect(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1",
  {
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

// Define a Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  code: Number,
  availability: Boolean,
});

// Define a Mongoose Model
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON
app.use(express.json());

// Route to get all persons
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
