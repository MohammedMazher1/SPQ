export interface User {
  id: string;
  name: string;
  email: string;
  role: string; // e.g., 'admin', 'editor', 'viewer'
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdateInput = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;
