# Quick Setup Guide

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd project-juno/backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd project-juno/frontend
npm install
# Create .env.local with: NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 📋 Required API Keys

You'll need to set up these services:

1. **OpenRouter** (for Gemini AI)
   - Sign up at https://openrouter.ai
   - Get your API key
   - Add to backend `.env`: `OPENROUTER_API_KEY=your_key`

2. **RapidAPI** (for Amazon products)
   - Sign up at https://rapidapi.com
   - Subscribe to "Real-Time Amazon Data" API
   - Get your API key
   - Add to backend `.env`: `RAPIDAPI_KEY=your_key`

## 🎯 Usage Flow

1. Start with **Onboarding** (`/onboarding`) - Upload model photos
2. Go to **Chat** (`/chat`) - Talk with AI stylist
3. View **Gallery** (`/gallery`) - See your moodboards

## 🐛 Troubleshooting

- **CORS errors**: Check that `FRONTEND_URL` in backend `.env` matches frontend URL
- **API connection**: Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- **Port conflicts**: Change ports in `.env` files if needed

