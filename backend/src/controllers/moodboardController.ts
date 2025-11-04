import { Request, Response } from 'express';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'real-time-amazon-data.p.rapidapi.com';

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

async function searchProducts(query: string, gender: string = 'unisex') {
  try {
    const response = await axios.get(
      `https://${RAPIDAPI_HOST}/search`,
      {
        params: {
          query: `${gender} ${query}`,
          page: '1',
          country: 'US',
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      }
    );

    return response.data?.data?.products || [];
  } catch (error) {
    console.error('Product search error:', error);
    return [];
  }
}

export const moodboardController = {
  async generateMoodboard(req: Request, res: Response) {
    try {
      const { products, preferences } = req.body;

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Products array is required' });
      }

      // Generate moodboard title and description
      const result = await generateText({
        model,
        messages: [
          {
            role: 'user',
            content: `Create a creative, compelling title and description for a fashion moodboard containing these products: ${products.map((p: any) => p.title).join(', ')}. 
            Respond with JSON:
            {
              "title": "creative title",
              "description": "brief description"
            }`,
          },
        ],
      });

      let metadata;
      try {
        metadata = JSON.parse(result.text);
      } catch {
        metadata = {
          title: 'My Style Board',
          description: 'A curated collection of fashion items',
        };
      }

      res.json({
        success: true,
        moodboard: {
          id: `moodboard-${Date.now()}`,
          title: metadata.title,
          description: metadata.description,
          products,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Moodboard generation error:', error);
      res.status(500).json({ error: 'Failed to generate moodboard', message: error.message });
    }
  },

  async proactiveStyleGenerator(req: Request, res: Response) {
    try {
      const { stylingAdvice } = req.body;

      if (!stylingAdvice) {
        return res.status(400).json({ error: 'Styling advice is required' });
      }

      // Analyze styling advice to extract gender and items
      const analysisResult = await generateText({
        model,
        messages: [
          {
            role: 'user',
            content: `Analyze this fashion styling advice and extract:
1. Gender context (men/women/unisex)
2. Key clothing items mentioned (tops and bottoms only)

Styling advice: "${stylingAdvice}"

Respond with JSON:
{
  "gender": "men|women|unisex",
  "items": ["item1", "item2", ...]
}`,
          },
        ],
      });

      let analysis;
      try {
        analysis = JSON.parse(analysisResult.text);
      } catch {
        analysis = { gender: 'unisex', items: ['clothing'] };
      }

      // Search for products
      const allProducts: any[] = [];
      for (const item of analysis.items.slice(0, 3)) {
        const products = await searchProducts(item, analysis.gender);
        allProducts.push(...products.slice(0, 2));
      }

      // Generate moodboard title
      const titleResult = await generateText({
        model,
        messages: [
          {
            role: 'user',
            content: `Create a short, creative title (max 5 words) for a moodboard based on: "${stylingAdvice}"`,
          },
        ],
      });

      res.json({
        success: true,
        moodboard: {
          id: `auto-${Date.now()}`,
          title: titleResult.text.trim().replace(/"/g, ''),
          description: stylingAdvice,
          products: allProducts.slice(0, 6),
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error('Proactive style generation error:', error);
      res.status(500).json({ error: 'Failed to generate proactive style', message: error.message });
    }
  },
};

