require('dotenv').config();

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set');
  console.error('Please make sure you have a .env file with DATABASE_URL defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function createAdminUser(name: string, email: string, password: string) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const [user] = await sql`
      INSERT INTO users (id, name, email, password, is_admin)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword}, true)
      RETURNING id, name, email, is_admin as "isAdmin"
    `;

    console.log('Admin user created successfully:');
    console.log('ID:', user.id);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Is Admin:', user.isAdmin);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('Usage: npm run create-admin <name> <email> <password>');
  process.exit(1);
}

const [adminName, adminEmail, adminPassword] = args;

// Create the admin user
createAdminUser(adminName, adminEmail, adminPassword);