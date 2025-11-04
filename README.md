# Juno - AI Fashion Stylist

A modern, full-stack AI-powered fashion styling application with separated frontend and backend architecture.

## 🏗️ Architecture

This project is structured with a clear separation between frontend and backend:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Express.js with TypeScript, providing RESTful API endpoints

## 📁 Project Structure

```
project-juno/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Main server file
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/             # Next.js application
    ├── src/
    │   ├── app/          # Next.js App Router pages
    │   ├── components/   # React components
    │   ├── lib/          # Utilities and API client
    │   └── store/        # Zustand state management
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for:
  - OpenRouter (for Gemini AI)
  - RapidAPI (for Amazon products)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd project-juno/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
OPENROUTER_API_KEY=your_openrouter_api_key_here
FASHN_API_KEY=your_fashn_api_key_here
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=real-time-amazon-data.p.rapidapi.com
FRONTEND_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd project-juno/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Backend API Routes

- `POST /api/chat` - Chat with AI stylist (streaming)
- `POST /api/validate-image/validate` - Validate uploaded images
- `GET /api/products/search` - Search for products
- `POST /api/moodboard/generate` - Generate a moodboard
- `POST /api/moodboard/proactive-style` - Auto-generate moodboard from styling advice
- `GET /health` - Health check endpoint

## ✨ Features

- **AI Chat Interface**: Conversational fashion styling advice
- **Image Upload & Validation**: AI-powered image validation for styling suitability
- **Product Search**: Integration with Amazon product catalog
- **Moodboard Creation**: Visual collections of fashion items
- **Auto-Style Mode**: Automatically generate moodboards from styling conversations
- **Persistent State**: Cross-session data storage

## 🛠️ Technology Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Markdown
- Lucide Icons

### Backend
- Express.js
- TypeScript
- Vercel AI SDK
- OpenRouter API (Gemini 2.5 Flash)
- RapidAPI (Amazon Products)

## 📝 Development

### Running Both Servers

In separate terminals:

**Terminal 1 - Backend:**
```bash
cd project-juno/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd project-juno/frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd project-juno/backend
npm run build
npm start
```

**Frontend:**
```bash
cd project-juno/frontend
npm run build
npm start
```

## 🐛 Troubleshooting

1. **CORS Errors**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. **API Connection**: Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local` points to your backend
3. **Missing Dependencies**: Run `npm install` in both backend and frontend directories

## 📄 License

MIT License

