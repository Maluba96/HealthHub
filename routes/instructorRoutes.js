const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');


router.post('/instructors', instructorController.createInstructor);
router.get('/instructors', instructorController.getAllInstructors);
router.get('/instructors/:userId', instructorController.getInstructorByUserId);
router.delete('/instructors/:userId', instructorController.deleteInstructor);

module.exports = router;
