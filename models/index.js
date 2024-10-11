const User = require('./user');
const Instructor = require('./instructor');
const Course = require('./course');

User.hasOne(Instructor, { foreignKey: 'userId' });
Instructor.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Instructor,
  Course
};
