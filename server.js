const express = require('express');
const connectDB = require('./config/db');

const usersRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const postsRoute = require('./routes/api/posts');
const profileRoute = require('./routes/api/profile');
const path = require('path');

const app = express();

// DB CONNECT
connectDB();

// Init MIDDLEWARES
app.use(
  express.json({
    extended: false,
  })
);

// ROUTES
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);

// server static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server successfully running on port ${PORT}`);
});
