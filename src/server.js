const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const mongoURI = require('./mongo_uri');

const app = express();
// const port = process.env.PORT || 5000; // Use a port environment variable or default to 5000

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors()); // Allow CORS for frontend requests
app.use(bodyParser.json()); // Parse incoming JSON data

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// API Endpoint to save user data
app.post('/api/users', async (req, res) => {
  const { fullName, mobileNumber } = req.body;

  try {
    const newUser = new User({ fullName, mobileNumber });
    await newUser.save();
    res.status(201).send({ message: 'User data saved successfully!' });
  } catch (error) {
    console.log("Could not save User data");
}
})