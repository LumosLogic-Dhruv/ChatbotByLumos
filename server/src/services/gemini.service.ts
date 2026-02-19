import axios from 'axios';
import { config } from '../config/env';
import { companyKnowledge } from '../data/knowledge';

const MODELS = [
  { name: 'gemini-2.5-flash', version: 'v1beta' },
  { name: 'gemini-1.5-flash', version: 'v1beta' },
  { name: 'gemma-3-12b', version: 'v1beta' },
  { name: 'gemma-3-4b', version: 'v1beta' },
  { name: 'gemma-3-1b', version: 'v1beta' },
  { name: 'learnlm-1.5-pro-experimental', version: 'v1beta' },
  { name: 'gemini-pro', version: 'v1' }
];

export class GeminiService {
  private async tryModel(model: { name: string; version: string }, message: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${config.geminiApiKey}`;
    
    const prompt = `${companyKnowledge}\n\nUser Question: ${message}`;
    
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('No response');
    return reply;
  }

  async generateResponse(message: string): Promise<string> {
    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model.name}`);
        const reply = await this.tryModel(model, message);
        console.log(`Success with model: ${model.name}`);
        return reply;
      } catch (error: any) {
        console.log(`Model ${model.name} failed:`, error.response?.data?.error?.message || error.message);
      }
    }
    throw new Error('All models failed');
  }
}

export const geminiService = new GeminiService();
