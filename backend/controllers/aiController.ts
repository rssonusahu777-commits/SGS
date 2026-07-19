import { Request, Response, NextFunction } from 'express';
import { generateContent, generateCompletion } from '../services/aiService';

export const handleChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, context } = req.body;

    let systemPrompt = "You are an AI assistant for SafeStadium AI.";
    if (context === 'fan') {
      systemPrompt = `You are a helpful AI Fan Assistant for SafeStadium AI. 
Help fans find their seats, nearest restrooms, parking, food, match timings, etc.
Current Stadium Status: 
- Attendance: 45,000 / 60,000
- Match: Falcons vs. Eagles (Starts at 7:00 PM)
- Parking: Zone A is full, Zone B is 40% available.
Keep your responses concise and helpful.`;
    } else if (context === 'organizer') {
      systemPrompt = `You are a professional AI Organizer Assistant for SafeStadium AI.
Help organizers with tournament scheduling, announcements, security recommendations, and operations.
Provide structured, clear, and actionable advice.`;
    }

    const lastMessage = messages[messages.length - 1]?.content || "";
    const history = messages.slice(0, -1);

    const reply = await generateContent(systemPrompt, lastMessage, history);

    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    next(error);
  }
};

export const generateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { situation } = req.body;
    
    const prompt = `Generate a professional public announcement for a stadium regarding the following situation: "${situation}". The announcement should be clear, concise, and calm. Include instructions if necessary.`;
    
    const announcement = await generateCompletion(prompt);
    
    res.status(200).json({ success: true, data: { announcement } });
  } catch (error) {
    next(error);
  }
};

export const generateEmergencyPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.body;
    
    const prompt = `Generate a quick emergency response summary for a stadium regarding: "${type}". Include: Evacuation procedure, required staff, priority level (High/Critical), and estimated response time. Output in a structured markdown format.`;
    
    const plan = await generateCompletion(prompt);
    
    res.status(200).json({ success: true, data: { plan } });
  } catch (error) {
    next(error);
  }
};
