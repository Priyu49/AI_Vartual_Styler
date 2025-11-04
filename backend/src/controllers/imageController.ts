import { Request, Response } from 'express';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Create OpenRouter client (OpenRouter uses OpenAI-compatible API)
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://juno-fashion.com',
    'X-Title': 'Juno AI Fashion Stylist',
  },
});

const model = openrouter('google/gemini-2.0-flash-exp:free');

export const imageController = {
  async validateImage(req: Request, res: Response) {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      const result = await generateText({
        model,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image for fashion styling purposes. Determine if it's suitable for styling recommendations. Consider:
1. Is this a person/model photo suitable for fashion styling?
2. Is the image clear and well-lit?
3. Can you see the person's clothing clearly?
4. Is the person in a good pose for styling advice?

Respond with JSON only:
{
  "valid": true/false,
  "reason": "brief explanation",
  "suggestions": "any styling suggestions if valid"
}`,
              },
              {
                type: 'image',
                image: image,
              },
            ],
          },
        ],
      });

      try {
        const validation = JSON.parse(result.text);
        res.json(validation);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        res.json({
          valid: result.text.toLowerCase().includes('valid') || result.text.toLowerCase().includes('suitable'),
          reason: result.text,
          suggestions: '',
        });
      }
    } catch (error: any) {
      console.error('Image validation error:', error);
      res.status(500).json({ error: 'Failed to validate image', message: error.message });
    }
  },
};

