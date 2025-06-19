const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const rooms = {};
const ROOM_CLEANUP_TIMEOUT = 5 * 60 * 1000; // 5 minutes

function scheduleRoomCleanup(roomId) {
  if (rooms[roomId]?.cleanupTimer) return; // already scheduled
  rooms[roomId].cleanupTimer = setTimeout(() => {
    console.log(`Cleaning up room ${roomId} due to inactivity.`);
    delete rooms[roomId];
  }, ROOM_CLEANUP_TIMEOUT);
}

function cancelRoomCleanup(roomId) {
  if (rooms[roomId]?.cleanupTimer) {
    clearTimeout(rooms[roomId].cleanupTimer);
    rooms[roomId].cleanupTimer = null;
  }
}

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, userName, role }) => {
    if (!rooms[roomId]) {
      if (role !== 'interviewer') {
        socket.emit('invalid-room');
        return;
      }
      rooms[roomId] = { interviewer: null, candidate: null, cleanupTimer: null };
    }

    if (role === 'interviewer' && rooms[roomId].interviewer) {
      socket.emit('room-full');
      return;
    }

    if (role === 'candidate' && rooms[roomId].candidate) {
      socket.emit('room-full');
      return;
    }

    rooms[roomId][role] = { id: socket.id, userName };
    cancelRoomCleanup(roomId);

    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { userName, id: socket.id });

    console.log(`${role} ${userName} joined room ${roomId}`);
  });

  socket.on('offer', ({ roomId, offer, to }) => {
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ answer, to }) => {
    socket.to(to).emit('answer', { answer });
  });

  socket.on('ice-candidate', ({ candidate, to }) => {
    socket.to(to).emit('ice-candidate', { candidate });
  });

  // Relay chat messages
  socket.on('chat-message', ({ roomId, message, userName }) => {
    socket.to(roomId).emit('chat-message', { message, userName });
  });

  socket.on('leave-room', (roomId) => {
    if (rooms[roomId]) {
      const user = Object.entries(rooms[roomId]).find(([_, v]) => v?.id === socket.id);
      if (user) rooms[roomId][user[0]] = null;
      socket.to(roomId).emit('user-left');

      if (!rooms[roomId].interviewer && !rooms[roomId].candidate) {
        scheduleRoomCleanup(roomId);
      }
    }
    socket.leave(roomId);
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      if (rooms[roomId].interviewer?.id === socket.id) {
        rooms[roomId].interviewer = null;
        socket.to(roomId).emit('user-left');
      }
      if (rooms[roomId].candidate?.id === socket.id) {
        rooms[roomId].candidate = null;
        socket.to(roomId).emit('user-left');
      }

      if (!rooms[roomId].interviewer && !rooms[roomId].candidate) {
        scheduleRoomCleanup(roomId);
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
