const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./src/modules/common/constants/env');
const usersService = require('./src/modules/users/services/users');
const setupMongoConnection = require('./src/modules/common/utils/setupMongoConnection');

const broadcast = (room, message) => {
  room.forEach((ws) => ws.send(message));
};

setupMongoConnection().then(() => {
  const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log('Web socket server is running!');
  });

  const rooms = {};

  wss.on('connection', async (ws, req) => {
    if (!req.headers.authorization) {
      ws.send('Token must be provided!');
      ws.close();
    }

    const [_, token] = req.headers.authorization.split(' ');

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      ws.send('Token must be valid!');
      ws.close();
    }

    const user = await usersService.findById(payload.sub);

    if (user.role === 'guest') {
      const roomId = `chat-${user._id}`;

      rooms[roomId] ? rooms[roomId].push(ws) : (rooms[roomId] = [ws]);

      ws.send(`Hello, ${user.name}!`);
      ws.on('message', (rawMessage) => {
        const message = JSON.parse(rawMessage.toString());
        if (message.action === 'send_message') {
          const { roomId, payload } = message;
          broadcast(rooms[roomId], JSON.stringify(message));
        }
      });

      ws.on('close', () => {
        broadcast(rooms[roomId], `User ${user.name} left!`);
      });
    } else if (user.role === 'admin') {
      ws.on('message', (rawMessage) => {
        const message = JSON.parse(rawMessage.toString());
        if (message.action === 'join_room') {
          const { roomId } = message.payload;

          rooms[roomId].push(ws);

          broadcast(rooms[roomId], 'Admin joined!');
        } else if (message.action === 'send_message') {
          const { roomId, payload } = message;
          broadcast(rooms[roomId], JSON.stringify(message));
        }
      });
    }
  });

  wss.on('error', console.error);
});
