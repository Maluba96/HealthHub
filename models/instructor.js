const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Instructor = sequelize.define('Instructor', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

User.hasOne(Instructor, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Instructor.belongsTo(User, { foreignKey: 'userId' });

module.exports = Instructor;
