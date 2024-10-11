const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const flash = require('connect-flash');
const instructorRoutes = require('./routes/instructorRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(flash());

app.use('/courses', courseRoutes);
app.use('/users', userRoutes);
app.use('/api', instructorRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to HealthHub');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(3009, () => {
    console.log('Server is running on port 3009');
  });
});
