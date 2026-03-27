import type { NextApiRequest, NextApiResponse } from 'next';
import { FedStatusData } from '../../lib/types';
import { fetchFedStatus } from '../../lib/fedstatus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FedStatusData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await fetchFedStatus();
    
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch federation status' 
    });
  }
}
