const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const roomSchema = new mongoose.Schema({
  number: String,
  type: String,
  price: Number,
});

const Room = mongoose.model('Room', roomSchema);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.get('/api/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.post('/api/rooms', async (req, res) => {
  const newRoom = new Room(req.body);
  await newRoom.save();
  res.status(201).json(newRoom);
});

app.listen(5000, () => console.log("Server running on port 5000"));
