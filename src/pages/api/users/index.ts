import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserCreateInput } from '@/types/user';

// In-memory store for simplicity. Replace with a database in a real application.
const users: User[] = [];
let nextId = 1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      // Get all users
      try {
        // Simulate fetching users (e.g., from a database)
        // In a real app, you'd query your database here.
        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
      }
      break;
    case 'POST':
      // Create a new user
      try {
        const { name, email, role } = req.body as UserCreateInput;

        if (!name || !email || !role) {
          return res
            .status(400)
            .json({ message: 'Missing required fields: name, email, role' });
        }

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
          return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user with the same email already exists
        if (users.some(user => user.email === email)) {
          return res
            .status(409)
            .json({ message: 'User with this email already exists' });
        }

        const newUser: User = {
          id: (nextId++).toString(),
          name,
          email,
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(newUser);
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        // Check if it's a known error type or a generic one
        if (error instanceof Error) {
          res
            .status(500)
            .json({ message: `Error creating user: ${error.message}` });
        } else {
          res
            .status(500)
            .json({
              message: 'An unknown error occurred while creating the user',
            });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
