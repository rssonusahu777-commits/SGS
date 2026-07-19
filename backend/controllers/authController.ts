import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Simple mock user storage
const mockUsers: any[] = [];

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    const user = { _id: `mock_id_${Date.now()}`, name, email, password, role: role || 'fan' };
    mockUsers.push(user);

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    let user = mockUsers.find(u => u.email === email);
    if (!user) {
      // Create a default mock user if they try to login with any credentials
      user = { _id: 'mock_id_default', name: 'Demo User', email, role: 'organizer' };
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};
