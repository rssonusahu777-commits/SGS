import { Request, Response, NextFunction } from 'express';

// Mock Data Storage
let mockTournaments = [
  { 
    _id: '1', 
    name: 'Summer Football Championship 2026', 
    status: 'ongoing', 
    teams: [
      { _id: 't1', name: 'Eagles' },
      { _id: 't2', name: 'Falcons' },
      { _id: 't3', name: 'Panthers' }
    ], 
    matches: [
      { _id: 'm1', teamA: 'Eagles', teamB: 'Falcons', date: new Date().toISOString(), status: 'upcoming' },
      { _id: 'm2', teamA: 'Panthers', teamB: 'Eagles', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' }
    ] 
  },
  { 
    _id: '2', 
    name: 'Winter Regional Derby', 
    status: 'completed', 
    teams: [
      { _id: 't4', name: 'Lions' },
      { _id: 't5', name: 'Tigers' }
    ], 
    matches: [
      { _id: 'm3', teamA: 'Lions', teamB: 'Tigers', date: new Date(Date.now() - 5000000000).toISOString(), status: 'completed' }
    ] 
  }
];

export const getTournaments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      data: mockTournaments
    });
  } catch (error) {
    next(error);
  }
};

export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTournament = { _id: `mock_t_id_${Date.now()}`, ...req.body, teams: [], matches: [] };
    mockTournaments.push(newTournament);
    
    res.status(201).json({
      success: true,
      data: newTournament
    });
  } catch (error) {
    next(error);
  }
};

