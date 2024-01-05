import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.resolve('data/users.json');

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data: LoginData = req.body;
      const rawData = await fs.readFile(dataFilePath, 'utf-8');
      const users: SignUpData[] = JSON.parse(rawData);

      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        });
      }
      res.status(200).json({ success: true, user });
      if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', user.token);
      }
    } catch (error) {
      console.error('Error processing login:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
