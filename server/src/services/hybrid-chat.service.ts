import { faqCache, faqPatterns } from '../data/faq';
import { intentPatterns, getTimeBasedGreeting, getRandomResponse, templates } from '../data/templates';
import { responseCache } from '../utils/cache';
import { findRelevantChunks } from '../data/knowledge-chunks';
import { geminiService } from './gemini.service';
import { metricsTracker } from '../utils/metrics';

export class HybridChatService {
  
  async processMessage(message: string): Promise<{ reply: string; source: string }> {
    const startTime = Date.now();
    const normalizedMessage = message.toLowerCase().trim();
    
    try {
      // LEVEL 1: FAQ Cache (instant response)
      const faqResponse = this.checkFAQ(normalizedMessage);
      if (faqResponse) {
        const responseTime = Date.now() - startTime;
        metricsTracker.trackRequest('faq', responseTime);
        return { reply: faqResponse, source: 'faq' };
      }
      
      // LEVEL 2: Template Matching (greetings, thanks, etc.)
      const templateResponse = this.checkTemplates(normalizedMessage);
      if (templateResponse) {
        const responseTime = Date.now() - startTime;
        metricsTracker.trackRequest('template', responseTime);
        return { reply: templateResponse, source: 'template' };
      }
      
      // LEVEL 3: Response Cache (recent similar questions)
      const cachedResponse = responseCache.get(message);
      if (cachedResponse) {
        const responseTime = Date.now() - startTime;
        metricsTracker.trackRequest('cache', responseTime);
        return { reply: cachedResponse, source: 'cache' };
      }
      
      // LEVEL 4: Gemini API (complex queries with minimal context)
      const apiResponse = await this.callGeminiWithContext(message);
      
      // Cache the response for future use
      responseCache.set(message, apiResponse);
      
      const responseTime = Date.now() - startTime;
      metricsTracker.trackRequest('api', responseTime);
      
      return { reply: apiResponse, source: 'api' };
      
    } catch (error) {
      metricsTracker.trackError();
      console.error('Hybrid Chat Service Error:', error);
      return { 
        reply: "I apologize, but I'm having trouble processing your request. Please contact our team at info@lumoslogic.com for immediate assistance.",
        source: 'error'
      };
    }
  }
  
  private checkFAQ(message: string): string | null {
    // Direct match
    if (faqCache[message]) {
      return faqCache[message];
    }
    
    // Pattern matching
    for (const { pattern, key } of faqPatterns) {
      if (pattern.test(message)) {
        return faqCache[key];
      }
    }
    
    // Fuzzy matching
    for (const [question, answer] of Object.entries(faqCache)) {
      if (this.fuzzyMatch(message, question)) {
        return answer;
      }
    }
    
    return null;
  }
  
  private checkTemplates(message: string): string | null {
    // Greeting
    if (intentPatterns.greeting.test(message)) {
      return getTimeBasedGreeting();
    }
    
    // Thanks
    if (intentPatterns.thanks.test(message)) {
      return getRandomResponse(templates.thanks);
    }
    
    // Goodbye
    if (intentPatterns.goodbye.test(message)) {
      return getRandomResponse(templates.goodbye);
    }
    
    return null;
  }
  
  private async callGeminiWithContext(message: string): Promise<string> {
    // Find 2 most relevant knowledge chunks
    const relevantChunks = findRelevantChunks(message, 2);
    
    // Build minimal context
    const context = relevantChunks.map(chunk => chunk.content).join('\n\n');
    
    // Create optimized prompt
    const prompt = `You are InteliQ, Lumos Logic's AI assistant. Answer ONLY based on this context. Be concise and professional.

Context:
${context}

User Question: ${message}

Instructions:
- If the question is about Lumos Logic, answer using the context
- If unrelated to Lumos Logic, politely redirect: "I can only help with Lumos Logic questions. Contact info@lumoslogic.com for assistance."
- Keep responses under 100 words
- Be friendly and professional`;

    return await geminiService.generateResponse(prompt);
  }
  
  private fuzzyMatch(str1: string, str2: string): boolean {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    
    let matches = 0;
    for (const word1 of words1) {
      if (word1.length < 3) continue;
      for (const word2 of words2) {
        if (word2.includes(word1) || word1.includes(word2)) {
          matches++;
          break;
        }
      }
    }
    
    return matches >= Math.min(words1.length, words2.length) * 0.6;
  }
  
  getMetrics() {
    return {
      ...metricsTracker.getMetrics(),
      cacheStats: responseCache.getStats()
    };
  }
}

export const hybridChatService = new HybridChatService();
