# AI Chatbot Backend

Express.js backend with Google Gemini API integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## Run

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

## API Endpoint

POST `/api/chat`

Request:
```json
{
  "message": "Hello, AI!"
}
```

Response:
```json
{
  "success": true,
  "reply": "AI response here"
}
```
