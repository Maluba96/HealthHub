const User = require('../models/user');
const Instructor = require('../models/instructor');


exports.createInstructor = async (req, res) => {
  try {
    // Find the user by ID and check if the role is 'instructor'
    const user = await User.findByPk(req.body.userId);
    if (user && user.role === 'instructor') {
      // Create the instructor if the user is an instructor
      const instructor = await Instructor.create({
        name: req.body.name,
        expertise: req.body.expertise,
        bio: req.body.bio,
        userId: user.id, // Link the user with the instructor
      });
      res.status(201).json(instructor);
    } else {
      res.status(400).json({ message: 'User must have an instructor role' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll({ include: User }); // Include user details
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getInstructorByUserId = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ where: { userId: req.params.userId }, include: User });
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ where: { userId: req.params.userId } });
    if (instructor) {
      await instructor.destroy();
      res.json({ message: 'Instructor deleted successfully' });
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
