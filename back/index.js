const express = require('express');
const app = express();
const cors = require('cors')
const uuid = require('uuid')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const store = {
  messages: [],
  usersState: [],
  usersTyping: []
}

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('client-set-user', (title) => {
    const newTitle = title.trim();
    if (newTitle) {
      if (store.usersState.some(user => user.name === newTitle)) {
        store.usersState = store.usersState.map(user => user.name === newTitle ? { ...user, sessionId: socket.id } : user);
        socket.emit('server-set-user', store.usersState.find(user => user.name === newTitle))
      } else {
        const newUser = { name: newTitle, id: uuid.v4(), sessionId: socket.id };
        store.usersState.push(newUser);
        socket.emit('server-set-user', newUser)
      }
    } else {
      socket.emit('server-set-user', 'Title was not provided')
    }
  });

  socket.on("client-message-sent", (message) => {
    const receivedMessage = JSON.parse(message);
    if (receivedMessage?.text && receivedMessage?.userId) {
      const user = store.usersState.find(user => user.id === receivedMessage.userId);
      if (user) {
        store.usersState = store.usersState.map(user => user.id === receivedMessage.userId ? { ...user, sessionId: socket.id } : user);
        const newMessage = { text: receivedMessage.text, id: uuid.v4(), user };
        store.messages.push(newMessage);
        io.emit('server-message-received', newMessage);
      }
    }
  })

  socket.on("client-started-typing", (userId) => {
    if (store.usersTyping.indexOf(userId) < 0) {
      store.usersState = store.usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
      store.usersTyping.push(userId);
      socket.broadcast.emit('server-user-typing', store.usersState.find(user => user.id === userId));
    }
  })

  socket.on("client-stopped-typing", (userId) => {
    store.usersState = store.usersState.map(user => user.id === userId ? { ...user, sessionId: socket.id } : user);
    if (store.usersTyping.indexOf(userId) >= 0) {
      store.usersTyping = store.usersTyping.filter(user => user !== userId);
      socket.broadcast.emit('server-user-stopped-typing', userId);
    }
  })

  socket.on('disconnect', () => {
    const disconnectedUser = store.usersState.find(user => user.sessionId === socket.id);
    if (disconnectedUser) {
      store.usersTyping = store.usersTyping.filter(user => user !== disconnectedUser.id);
      socket.broadcast.emit('server-user-stopped-typing', disconnectedUser.id);
    }
    console.log('🔥: A user disconnected', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send("hi, this is back for ws chat")
});

app.get('/messages', (req, res) => {
  res.send(JSON.stringify(store.messages));
})

app.post('/users', (req, res) => {
  if (req.body) {
    if (store.usersState.some(user => user.name === req.body.title)) {
      res.send(JSON.stringify(store.usersState.find(user => user.name === req.body.title)));
    } else {
      const newUser = { name: req.body.title, id: uuid.v4() };
      store.usersState.push(newUser);
      res.send(JSON.stringify(newUser));
    }
  } else {
    res.status(400).send(JSON.stringify({ ok: false, reason: 'There is no req body' }));
  }
})

const port = 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});