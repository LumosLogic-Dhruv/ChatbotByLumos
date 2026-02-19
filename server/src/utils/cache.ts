interface CacheEntry {
  question: string;
  answer: string;
  timestamp: number;
  hits: number;
}

class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 3600000; // 1 hour
  private readonly MAX_SIZE = 1000;

  set(question: string, answer: string): void {
    const key = this.normalize(question);
    
    if (this.cache.size >= this.MAX_SIZE) {
      this.evictOldest();
    }
    
    this.cache.set(key, {
      question,
      answer,
      timestamp: Date.now(),
      hits: 0
    });
  }

  get(question: string): string | null {
    const key = this.normalize(question);
    const entry = this.cache.get(key);
    
    if (!entry) {
      return this.findSimilar(question);
    }
    
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    entry.hits++;
    return entry.answer;
  }

  private normalize(text: string): string {
    return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
  }

  private findSimilar(question: string): string | null {
    const normalized = this.normalize(question);
    const words = normalized.split(/\s+/);
    
    let bestMatch: CacheEntry | null = null;
    let bestScore = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (Date.now() - entry.timestamp > this.TTL) {
        this.cache.delete(key);
        continue;
      }
      
      const score = this.similarity(normalized, key);
      if (score > 0.7 && score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
    
    if (bestMatch) {
      bestMatch.hits++;
      return bestMatch.answer;
    }
    
    return null;
  }

  private similarity(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = [...set1].filter(x => set2.has(x)).length;
    const union = new Set([...set1, ...set2]).size;
    
    return intersection / union;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.MAX_SIZE,
      ttl: this.TTL
    };
  }

  clear(): void {
    this.cache.clear();
  }
}

export const responseCache = new ResponseCache();
