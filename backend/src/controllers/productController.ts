import { Request, Response } from 'express';
import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'real-time-amazon-data.p.rapidapi.com';

export const productController = {
  async searchProducts(req: Request, res: Response) {
    try {
      const { query, gender, page = '1' } = req.query;

      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const searchQuery = gender ? `${gender} ${query}` : query as string;

      const response = await axios.get(
        `https://${RAPIDAPI_HOST}/search`,
        {
          params: {
            query: searchQuery,
            page: page as string,
            country: 'US',
          },
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST,
          },
        }
      );

      const products = response.data?.data?.products || [];

      res.json({
        success: true,
        products: products.map((product: any) => ({
          id: product.asin || product.product_id,
          title: product.title || product.product_title,
          price: product.price || product.product_price,
          image: product.image || product.product_main_image_url,
          rating: product.rating || product.product_rating,
          url: product.url || product.product_url,
          availability: product.availability || 'In Stock',
        })),
        total: products.length,
      });
    } catch (error: any) {
      console.error('Product search error:', error);
      res.status(500).json({
        error: 'Failed to search products',
        message: error.response?.data?.message || error.message,
      });
    }
  },
};

