import { createConnection } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  if (req.method === 'GET') {
    try {
      const { user_index } = req.query;
      console.log(user_index);
      const [rows, fields] = await connection.execute(
        'SELECT * FROM user WHERE user_index = ?',
        [user_index]
      );

      console.log(rows);

      if (rows.length > 0) {
        res.status(200).json({ sucess: true, data: rows[0] });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'Database error' });
    } finally {
      connection.end();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
