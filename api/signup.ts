import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { success: boolean } | { error: string };

let users: { name: string; number: string }[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, number } = req.body;
    if (
      typeof name !== 'string' ||
      typeof number !== 'string' ||
      name.length < 2 ||
      !/^[0-9]{10,15}$/.test(number)
    ) {
      res.status(400).json({ error: 'Invalid data.' });
      return;
    }
    users.push({ name, number });
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}