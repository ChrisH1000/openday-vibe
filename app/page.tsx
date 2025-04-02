'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import App from './components/App'

export default function Home() {
  const { data: session, status } = useSession();

  // If user is authenticated, redirect based on role
  if (status === 'authenticated') {
    if (session.user.isAdmin) {
      redirect('/admin');
    } else {
      redirect('/planner');
    }
  }

  // Show landing page for unauthenticated users
  return <App />
}