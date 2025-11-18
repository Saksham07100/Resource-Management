# Chat Tutor Setup Guide

## Overview
The Chat Tutor feature uses Google's Gemini API to provide an intelligent study assistant that answers student questions based on course materials, subjects, and resources available in the system.

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key
5. The key will look like: `AIza...`

### 2. Configure the Backend

1. Open `/backend/.env` file
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
3. The model is already configured to use `gemini-1.5-flash` (fast and cost-effective option)

### 3. Restart the Backend Server

```bash
cd backend
npm start
```

## How It Works

1. **Student asks a question** via the Chat Tutor interface
2. **Backend retrieves relevant materials** from the database based on:
   - Selected subject (or all subjects)
   - Student's enrollment number, branch, and semester
3. **Gemini generates an answer** using:
   - The question
   - Available course materials
   - Student context
4. **Response is returned** with:
   - AI-generated answer
   - Links to relevant study materials

## Features

- ✅ Subject-specific filtering
- ✅ Context-aware responses based on student profile
- ✅ Suggests relevant study materials
- ✅ Quick prompt suggestions for common queries
- ✅ Real-time chat interface
- ✅ Fast responses with Gemini Flash model

## Without API Key

If no API key is configured, the chatbot will still work and display relevant materials with helpful suggestions.

## Costs

- Using `gemini-1.5-flash` model (default)
- **FREE tier available** with generous quotas
- Very cost-effective for educational use
- Check [Google AI Pricing](https://ai.google.dev/pricing) for current rates

## Available Models

You can change the model in `.env`:
```
GEMINI_MODEL=gemini-1.5-flash     # Fast, efficient (default)
GEMINI_MODEL=gemini-1.5-pro       # More capable, slower
GEMINI_MODEL=gemini-2.0-flash-exp # Latest experimental
```

## Troubleshooting

### Issue: "Chatbot is unavailable right now"
- Check if backend server is running
- Verify API key is correctly set in `.env`
- Check backend console for errors
- Ensure `@google/generative-ai` package is installed

### Issue: No materials showing in responses
- Ensure materials are uploaded in the system
- Check database connection
- Verify materials have proper subject associations

### Issue: Slow responses
- Normal for first request (cold start)
- Subsequent requests should be faster
- Consider using `gemini-1.5-flash` for faster responses (default)

### Issue: API quota exceeded
- Check your usage at [Google AI Studio](https://aistudio.google.com/)
- Gemini has generous free tier
- Consider upgrading if needed

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file with the API key to version control
- Keep your API key confidential
- The `.env` file is already in `.gitignore`
- Monitor usage in Google AI Studio dashboard
