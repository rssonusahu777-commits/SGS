import express from 'express';
import { getTournaments, createTournament } from '../controllers/tournamentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getTournaments);
// Require authentication and specific roles for creating
// router.post('/', protect, authorize('admin', 'organizer'), createTournament);
router.post('/', createTournament); // Mocked for preview without UI auth hooked up

export default router;
