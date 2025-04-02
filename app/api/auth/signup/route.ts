import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, createUsersTable } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Create the users table if it doesn't exist
    await createUsersTable();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTRATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}