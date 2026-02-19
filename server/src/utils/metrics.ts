interface Metrics {
  totalRequests: number;
  faqHits: number;
  templateHits: number;
  cacheHits: number;
  apiCalls: number;
  errors: number;
  avgResponseTime: number;
}

class MetricsTracker {
  private metrics: Metrics = {
    totalRequests: 0,
    faqHits: 0,
    templateHits: 0,
    cacheHits: 0,
    apiCalls: 0,
    errors: 0,
    avgResponseTime: 0
  };
  
  private responseTimes: number[] = [];

  trackRequest(source: 'faq' | 'template' | 'cache' | 'api', responseTime: number): void {
    this.metrics.totalRequests++;
    
    switch(source) {
      case 'faq': this.metrics.faqHits++; break;
      case 'template': this.metrics.templateHits++; break;
      case 'cache': this.metrics.cacheHits++; break;
      case 'api': this.metrics.apiCalls++; break;
    }
    
    this.responseTimes.push(responseTime);
    if (this.responseTimes.length > 100) {
      this.responseTimes.shift();
    }
    
    this.metrics.avgResponseTime = 
      this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
  }

  trackError(): void {
    this.metrics.errors++;
  }

  getMetrics(): Metrics & { cacheEfficiency: string; apiUsagePercent: string } {
    const cacheTotal = this.metrics.faqHits + this.metrics.templateHits + this.metrics.cacheHits;
    const cacheEfficiency = this.metrics.totalRequests > 0 
      ? ((cacheTotal / this.metrics.totalRequests) * 100).toFixed(1)
      : '0';
    
    const apiUsagePercent = this.metrics.totalRequests > 0
      ? ((this.metrics.apiCalls / this.metrics.totalRequests) * 100).toFixed(1)
      : '0';
    
    return {
      ...this.metrics,
      cacheEfficiency: `${cacheEfficiency}%`,
      apiUsagePercent: `${apiUsagePercent}%`
    };
  }

  reset(): void {
    this.metrics = {
      totalRequests: 0,
      faqHits: 0,
      templateHits: 0,
      cacheHits: 0,
      apiCalls: 0,
      errors: 0,
      avgResponseTime: 0
    };
    this.responseTimes = [];
  }
}

export const metricsTracker = new MetricsTracker();
