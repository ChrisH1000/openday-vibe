'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });

  // Check if user is admin
  if (status === 'authenticated' && !session.user.isAdmin) {
    redirect('/planner');
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Welcome, {session?.user?.name}!</p>
        <p className="text-gray-600">You are logged in as an administrator.</p>
      </div>
    </div>
  );
}