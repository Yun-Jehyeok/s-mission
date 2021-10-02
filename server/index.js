const config = require('./config/index');
const express = require('express');
const mongoose = require('mongoose');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const { MONGO_URI, PORT } = config;

app.use(hpp());
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connecting Success!!');
  })
  .catch((err) => console.log(err));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/project', require('./routes/api/project'));

///////////////// socket.io /////////////////

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  // join : 채팅 참여 이벤트
  socket.on('join', ({ roomName: room, userName: user }) => {
    socket.join(room);
    io.to(room).emit('onConnect', `${user} 님이 입장했습니다.`);
    // send : 클라이언트가 메시지 보내는 이벤트
    // item: {name: String, msg: String, timeStamp: String}
    socket.on('onSend', (messageItem) => {
      io.to(room).emit('onReceive', messageItem);
    });

    socket.on('disconnect', () => {
      socket.leave(room);
      io.to(room).emit('onDisconnect', `${user} 님이 퇴장하셨습니다.`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
