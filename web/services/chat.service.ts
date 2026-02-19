import { sendChatMessage } from '@/lib/api';

export class ChatService {
  async sendMessage(message: string): Promise<string> {
    try {
      const reply = await sendChatMessage(message);
      return reply;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to send message');
    }
  }
}

export const chatService = new ChatService();
