import { Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';
import { successResponse, errorResponse } from '../utils/apiResponse';

export class ChatController {
  async sendMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json(errorResponse('Message is required'));
      }

      const reply = await geminiService.generateResponse(message);
      res.json(successResponse(reply));
    } catch (error: any) {
      console.error('Chat Controller Error:', error);
      res.status(500).json(errorResponse(error.message || 'Internal server error'));
    }
  }
}

export const chatController = new ChatController();
