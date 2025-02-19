const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const emergencyRoutes = require('./routes/emergency');
const hospitalRoutes = require('./routes/hospital');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/emergency', emergencyRoutes);
app.use('/api/hospital', hospitalRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.IO for real-time communications.
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('sendMessage', (data) => {
    // Broadcast message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});