const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables first

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Optional: Log to confirm .env is loading properly
console.log('Connecting to MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB with recommended options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Test route - to check if backend server is running
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Your auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
