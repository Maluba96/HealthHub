// models/course.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Instructor = require('./instructor');
const Category = require('./category'); // Include the new category model

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Instructor,
      key: 'userId',
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Make this optional
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

Course.belongsTo(Instructor, { foreignKey: 'instructor_id' });
Course.belongsTo(Category, { foreignKey: 'category_id' }); // Association with Category

module.exports = Course;
