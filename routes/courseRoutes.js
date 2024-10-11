const express = require('express');
const { getAllCourses, createCourse,getCourseById, deleteCourse} = require('../controllers/courseController');

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', createCourse);
router.get('/:id', getCourseById);
router.delete('/:id', deleteCourse)

module.exports = router;
