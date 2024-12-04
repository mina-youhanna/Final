import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { createSubscription } from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/CreateSubscription', createSubscription);

export default router;
