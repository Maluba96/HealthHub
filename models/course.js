const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Instructor = require('./instructor'); // Assuming you have an instructor model

const Course = sequelize.define('Course', {
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
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    }
}, {
    timestamps: false // Disable timestamps (createdAt, updatedAt)
});


Course.belongsTo(Instructor, { foreignKey: 'instructor_id' });

module.exports = Course;
