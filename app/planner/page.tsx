'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function PlannerPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Event Planner</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Welcome, {session?.user?.name}!</p>
        <p className="text-gray-600">You can plan your events here.</p>
      </div>
    </div>
  );
}