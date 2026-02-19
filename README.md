# AI Chatbot - Production Ready

A complete full-stack AI chatbot application powered by Google Gemini API.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, React Context
- **Backend**: Node.js, Express.js, TypeScript
- **AI**: Google Gemini API (REST)
- **Design**: Modern ChatGPT-style dark theme UI

## Project Structure

```
ChatbotbyLumos/
├── server/          → Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
└── web/             → Next.js frontend
    ├── app/
    ├── components/
    ├── context/
    ├── services/
    ├── types/
    ├── lib/
    └── package.json
```

## Quick Start

### 1. Get Gemini API Key

Get your free API key from: https://makersuite.google.com/app/apikey

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and add your API key:
```
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Start backend:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### 3. Setup Frontend

Open a new terminal:

```bash
cd web
npm install
npm run dev
```

Frontend will run on http://localhost:3000

### 4. Use the App

Open http://localhost:3000 in your browser and start chatting!

## API Endpoint

**POST** `/api/chat`

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
  "reply": "Hello! How can I help you today?"
}
```

## Features

✅ Production-ready architecture  
✅ ChatGPT-style UI  
✅ Dark theme  
✅ Real-time typing indicator  
✅ Auto-scroll messages  
✅ Error handling  
✅ Mobile responsive  
✅ TypeScript throughout  
✅ CORS enabled  
✅ Clean code structure  

## Production Build

Backend:
```bash
cd server
npm run build
npm start
```

Frontend:
```bash
cd web
npm run build
npm start
```

## Troubleshooting

**Backend won't start:**
- Make sure you added GEMINI_API_KEY to server/.env
- Check if port 5000 is available

**Frontend can't connect:**
- Make sure backend is running on http://localhost:5000
- Check browser console for errors

**API errors:**
- Verify your Gemini API key is valid
- Check your internet connection

## License

MIT
