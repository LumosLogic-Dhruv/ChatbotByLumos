import { Request, Response } from 'express';
import { hybridChatService } from '../services/hybrid-chat.service';
import { successResponse, errorResponse } from '../utils/apiResponse';

export class ChatController {
  async sendMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json(errorResponse('Message is required'));
      }

      const { reply, source } = await hybridChatService.processMessage(message);
      res.json({ success: true, reply, source });
    } catch (error: any) {
      console.error('Chat Controller Error:', error);
      res.status(500).json(errorResponse(error.message || 'Internal server error'));
    }
  }
  
  async getMetrics(req: Request, res: Response) {
    try {
      const metrics = hybridChatService.getMetrics();
      res.json({ success: true, metrics });
    } catch (error: any) {
      res.status(500).json(errorResponse('Failed to fetch metrics'));
    }
  }
}

export const chatController = new ChatController();
