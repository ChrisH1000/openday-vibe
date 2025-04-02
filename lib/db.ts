import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
};

export async function createUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Users table created or already exists');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

export async function createUser({ email, name, password, isAdmin = false }: { email: string; name: string; password: string; isAdmin?: boolean }) {
  try {
    const [user] = await sql`
      INSERT INTO users (id, name, email, password, is_admin)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${password}, ${isAdmin})
      RETURNING id, name, email, is_admin as "isAdmin"
    ` as User[];

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [user] = await sql`
      SELECT id, name, email, password, is_admin as "isAdmin"
      FROM users
      WHERE email = ${email}
    ` as User[];
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const [user] = await sql`
      SELECT id, name, email, is_admin as "isAdmin"
      FROM users
      WHERE id = ${id}
    ` as User[];
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}