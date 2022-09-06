import express from 'express';
import {
    createJob,
    deleteJob,
    getAllJobs,
    getJob,
    showStats,
    updateJob
} from '../controllers/jobs.controller.js';
import TestuserMiddleware from '../middleware/testuser.middleware.js';

const router = express.Router();

router.route('/').get(getAllJobs).post(TestuserMiddleware, createJob);
router.route('/stats').get(showStats);
router
    .route('/:id')
    .get(getJob)
    .patch(TestuserMiddleware, updateJob)
    .delete(TestuserMiddleware, deleteJob);

export default router;