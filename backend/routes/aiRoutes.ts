import express from 'express';
import { handleChat, generateAnnouncement, generateEmergencyPlan } from '../controllers/aiController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public / Fan routes
router.post('/chat', handleChat);

// Protected routes (Organizers / Security)
// router.use(protect); // Need to skip for preview since we don't have real login fully wired to frontend yet
router.post('/announcement', generateAnnouncement);
router.post('/emergency-plan', generateEmergencyPlan);

export default router;
