import express from 'express';
import { enrollInSubject } from '../controllers/studentController.js';
import { protect } from '../authMiddleware.js';

const router = express.Router();

// Protect the enroll route
router.post('/enroll', enrollInSubject);

export default router;
