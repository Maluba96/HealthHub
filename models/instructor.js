const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');

const Instructor = sequelize.define('Instructor', {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',      
    },
    primaryKey: true,
  },
}, {
  timestamps: false,
});


User.hasOne(Instructor, { foreignKey: 'id' });
Instructor.belongsTo(User, { foreignKey: 'id' });

module.exports = Instructor;
