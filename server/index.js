const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectDB, port } = require('./config');
const { authRouter, aiRoutes } = require('./routes');
const socketService = require('./services/socket.service');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/ai', aiRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketService.initialize(io);

server.listen(port, () => console.log(`Server running on port ${port}`));
