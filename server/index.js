const config = require('./config/index');
const express = require('express');
const mongoose = require('mongoose');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
