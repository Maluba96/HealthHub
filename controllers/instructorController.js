const User = require('../models/user');
const Instructor = require('../models/instructor');

exports.createInstructor = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (user && user.role === 'instructor') {
      const existingInstructor = await Instructor.findOne({ where: { userId: user.id } });
      if (existingInstructor) {
        return res.status(400).json({ message: 'Instructor already exists' });
      }

      const instructor = await Instructor.create({
        name: req.body.name,
        expertise: req.body.expertise,
        bio: req.body.bio,
        userId: user.id,
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
    const { expertise, sortBy } = req.query;
    const whereClause = expertise ? { expertise } : {};

    const instructors = await Instructor.findAll({
      where: whereClause,
      include: User,
      order: sortBy ? [[sortBy, 'ASC']] : []
    });
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructorByUserId = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ where: { userId: req.params.userId }, include: User });
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ where: { userId: req.params.userId } });
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    await instructor.update({
      name: req.body.name,
      expertise: req.body.expertise,
      bio: req.body.bio,
    });
    res.json({ message: 'Instructor updated successfully', instructor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ where: { userId: req.params.userId } });
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    await instructor.destroy();
    res.json({ message: 'Instructor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
