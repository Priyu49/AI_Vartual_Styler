import axios from 'axios';
import { API_BASE_URL } from './utils';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{ type: 'text' | 'image'; text?: string; image?: string }>;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  rating?: string;
  url: string;
  availability?: string;
}

export interface Moodboard {
  id: string;
  title: string;
  description: string;
  products: Product[];
  createdAt: string;
}

export const apiClient = {
  async chat(messages: Message[]): Promise<ReadableStream> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    return response.body as ReadableStream;
  },

  async validateImage(image: string): Promise<{ valid: boolean; reason: string; suggestions?: string }> {
    const response = await api.post('/api/validate-image/validate', { image });
    return response.data;
  },

  async searchProducts(query: string, gender?: string, page: number = 1): Promise<Product[]> {
    const response = await api.get('/api/products/search', {
      params: { query, gender, page },
    });
    return response.data.products || [];
  },

  async generateMoodboard(products: Product[], preferences?: any): Promise<Moodboard> {
    const response = await api.post('/api/moodboard/generate', { products, preferences });
    return response.data.moodboard;
  },

  async proactiveStyleGenerator(stylingAdvice: string): Promise<Moodboard> {
    const response = await api.post('/api/moodboard/proactive-style', { stylingAdvice });
    return response.data.moodboard;
  },
};

