import axios from 'axios';
import { API_BASE_URL, CHAT_ENDPOINT } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (message: string): Promise<string> => {
  const response = await api.post(CHAT_ENDPOINT, { message });
  return response.data.reply;
};
