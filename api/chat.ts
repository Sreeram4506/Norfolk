import { VercelRequest, VercelResponse } from '@vercel/node';

const CHAT_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const API_KEY = process.env.NVIDIA_API_KEY || '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';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model, temperature, max_tokens } = req.body;

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'meta/llama-3.1-405b-instruct',
        messages: messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 512,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('NVIDIA API Error:', errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI service' });
  }
}
