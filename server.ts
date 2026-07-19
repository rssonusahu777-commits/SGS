import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import backendApp from './backend/app';

dotenv.config();

const PORT = 3000;

async function startServer() {
  // Database connection removed for purely local mock execution
  console.log('✅ Running in local mock mode without external database.');

  // We use backendApp as the base to attach Vite or static serving
  const httpServer = createServer(backendApp);
  
  // Socket.IO Setup
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Attach socket.io instance to app for use in controllers
  backendApp.set('io', io);

  // VITE MIDDLEWARE
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    backendApp.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    backendApp.use(express.static(distPath));
    backendApp.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
