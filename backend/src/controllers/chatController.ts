import { Request, Response } from 'express';
import { streamText } from 'ai';
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

// Use OpenRouter with Gemini 2.5 Flash model
const model = openrouter('google/gemini-2.0-flash-exp:free');

const SYSTEM_PROMPT = `You are Juno, an expert AI fashion stylist specializing in personalized clothing recommendations. Your expertise includes:

1. **Fashion Expertise**: Provide professional styling advice focused on tops and bottoms (excluding accessories)
2. **Personalization**: Analyze user photos and preferences to give tailored recommendations
3. **Product Knowledge**: Suggest specific clothing items with detailed descriptions
4. **Styling Guidance**: Offer complete outfit combinations and styling tips

**Guidelines**:
- Focus only on tops and bottoms (shirts, blouses, pants, skirts, etc.)
- Provide specific, actionable styling advice
- Consider the user's body type, skin tone, and preferences when visible
- Be encouraging and positive in your recommendations
- When suggesting products, provide clear descriptions that can be used for product searches

**Tool Usage**: When you want to search for products, use the search_products tool with appropriate search terms based on gender (men/women/unisex) and clothing type.`;

export const chatController = {
  async handleChat(req: Request, res: Response) {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Set up streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const result = await streamText({
        model,
        system: SYSTEM_PROMPT,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        tools: {
          search_products: {
            description: 'Search for fashion products on Amazon. Use this when the user asks for product recommendations or when you want to suggest specific clothing items.',
            parameters: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for products (e.g., "men blue jeans", "women white blouse")',
                },
                gender: {
                  type: 'string',
                  enum: ['men', 'women', 'unisex'],
                  description: 'Gender category for the products',
                },
              },
              required: ['query', 'gender'],
            },
            execute: async ({ query, gender }: { query: string; gender: string }) => {
              // This will be handled by the frontend or a separate service
              return {
                success: true,
                query,
                gender,
                message: 'Product search initiated. Results will be displayed separately.',
              };
            },
          },
        },
        maxTokens: 2000,
      });

      // Stream the response
      for await (const chunk of result.textStream) {
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (error: any) {
      console.error('Chat error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to process chat', message: error.message });
      } else {
        res.end();
      }
    }
  },
};

