const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectmanager')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Project Schema with status and user reference
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { 
    type: String, 
    enum: ['planned', 'in-progress', 'completed', 'on-hold'],
    default: 'planned' 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Project Routes (protected)
app.get('/api/projects', auth, async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
});

app.post('/api/projects', auth, async (req, res) => {
  const project = new Project({
    ...req.body,
    userId: req.user._id
  });
  await project.save();
  res.status(201).json(project);
});

app.put('/api/projects/:id', auth, async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

app.delete('/api/projects/:id', auth, async (req, res) => {
  const project = await Project.findOneAndDelete({ 
    _id: req.params.id, 
    userId: req.user._id 
  });
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});