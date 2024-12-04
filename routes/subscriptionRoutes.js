import express from 'express';
import { createSubscription, getStudentSubscription } from '../controllers/subscriptionController.js';
import { protect } from '../authMiddleware.js';  // Middleware to ensure the user is authenticated

const router = express.Router();

// Route to create a new subscription (Protected route)
router.post('/create', createSubscription);

// Route to get the current student's subscription (Protected route)
router.get('/current' , getStudentSubscription);

export default router;
