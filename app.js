const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const flash = require('connect-flash');
const categoryRoutes = require('./routes/categoryRoutes');

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
app.use('/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await sequelize.models.Courses.findAll({ include: ['Category', 'Instructor'] });
    console.log('Courses Data:', courses);
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

app.get('/api/instructors', async (req, res) => {
  try {
    const instructors = await sequelize.models.Instructors.findAll();
    console.log('Instructors Data:', instructors);
    res.json(instructors);
  } catch (err) {
    console.error('Error fetching instructors:', err);
    res.status(500).json({ message: 'Failed to fetch instructors' });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(3009, () => {
    console.log('Server is running on port 3009');
  });
});
