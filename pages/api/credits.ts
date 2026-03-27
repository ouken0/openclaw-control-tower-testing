import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiCreditsData, generateMockCredits } from '../../lib/apiCredits';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCreditsData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In production, this would fetch real data from provider APIs:
    // - HuggingFace: https://api.huggingface.co/datasets/usage
    // - Gemini: https://generativelanguage.googleapis.com/v1beta/models
    // - Groq: https://api.groq.com/v1/usage
    // For now, return realistic mock data

    const data = generateMockCredits();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Credits Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch API credits' 
    });
  }
}
