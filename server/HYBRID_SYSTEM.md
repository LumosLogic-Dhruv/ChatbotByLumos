# Hybrid Chatbot System Documentation

## Architecture Overview

The InteliQ chatbot uses a 4-level progressive optimization system to minimize API costs while maintaining response quality.

## Response Levels

### Level 1: FAQ Cache (0ms, 0 API calls)
- **Purpose**: Instant responses for common questions
- **Coverage**: 20+ predefined Q&A pairs
- **Hit Rate Target**: 30-40%
- **Examples**: "What is Lumos Logic?", "How much does it cost?"

### Level 2: Template System (1-5ms, 0 API calls)
- **Purpose**: Handle simple interactions
- **Coverage**: Greetings, thanks, goodbyes
- **Features**: Time-based greetings, random response selection
- **Hit Rate Target**: 20-30%

### Level 3: Response Cache (5-10ms, 0 API calls)
- **Purpose**: Reuse recent AI responses
- **TTL**: 1 hour
- **Max Size**: 1000 entries
- **Similarity Threshold**: 70%
- **Hit Rate Target**: 10-20%

### Level 4: Gemini API (500-2000ms, 1 API call)
- **Purpose**: Complex queries requiring AI
- **Context**: Only 2 most relevant knowledge chunks
- **Token Limit**: ~500 tokens per request
- **Usage Target**: 10-30% of queries

## Performance Metrics

### Target Performance
- **Total Requests**: 100+ concurrent users
- **Avg Response Time**: <500ms
- **Cache Hit Rate**: 70-80%
- **API Usage**: 20-30% of requests
- **Error Rate**: <1%

### Monitoring Endpoint
```
GET /api/metrics
```

Response:
```json
{
  "totalRequests": 1000,
  "faqHits": 350,
  "templateHits": 250,
  "cacheHits": 150,
  "apiCalls": 250,
  "cacheEfficiency": "75.0%",
  "apiUsagePercent": "25.0%",
  "avgResponseTime": 320
}
```

## Knowledge Base Structure

### Chunks (8 total)
1. **company_overview** - General company info
2. **web_development** - Web services
3. **mobile_development** - Mobile services
4. **ai_ml_solutions** - AI/ML services
5. **cloud_devops** - Cloud & DevOps
6. **pricing_model** - Pricing info
7. **development_process** - How we work
8. **contact_support** - Contact details

Each chunk:
- 200-300 words
- Tagged for semantic matching
- Priority weighted (1-10)

## Rate Limiting
- **Window**: 60 seconds
- **Max Requests**: 20 per user
- **Identifier**: IP address or session ID

## Error Handling

### Graceful Degradation
1. API fails → Return cached response if available
2. No cache → Return FAQ if matches
3. No FAQ → Return friendly error with contact info

### Error Response
```json
{
  "success": false,
  "error": "Service temporarily unavailable",
  "fallback": "Contact info@lumoslogic.com"
}
```

## Updating Knowledge Base

### Add New FAQ
Edit `server/src/data/faq.ts`:
```typescript
"new question": "new answer"
```

### Add Knowledge Chunk
Edit `server/src/data/knowledge-chunks.ts`:
```typescript
{
  id: "new_chunk",
  content: "Your content here...",
  category: "services",
  tags: ["tag1", "tag2"],
  priority: 8
}
```

## Optimization Tips

1. **Monitor metrics** regularly via `/api/metrics`
2. **Update FAQ** for frequently asked questions
3. **Adjust cache TTL** based on content freshness needs
4. **Tune similarity threshold** for cache matching
5. **Add more knowledge chunks** for better context

## Cost Optimization

### Current Setup
- 70-80% requests served without API calls
- Average 200-300 API calls per 1000 requests
- Estimated cost: $0.01-0.02 per 1000 requests

### Best Practices
- Keep FAQ updated with common questions
- Monitor API usage percentage
- Increase cache TTL for stable content
- Use smaller knowledge chunks for precision
