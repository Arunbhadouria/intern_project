const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

router.use(protect); // All routes are protected

router
    .route('/')
    .get(getTasks)
    .post(
        [
            check('title', 'Title is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty()
        ],
        validate,
        createTask
    );

router
    .route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(authorize('admin'), deleteTask); // Only admin can delete

module.exports = router;
