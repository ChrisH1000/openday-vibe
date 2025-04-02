import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Home from './page'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn()
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn()
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows App component for unauthenticated users', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated'
    } as any)

    render(<Home />)
    // Add appropriate assertions for the App component
  })

  it('redirects admin users to /admin', () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { isAdmin: true } },
      status: 'authenticated'
    } as any)

    render(<Home />)
    // The redirect should be called with /admin
    expect(redirect).toHaveBeenCalledWith('/admin')
  })

  it('redirects non-admin users to /planner', () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { isAdmin: false } },
      status: 'authenticated'
    } as any)

    render(<Home />)
    // The redirect should be called with /planner
    expect(redirect).toHaveBeenCalledWith('/planner')
  })
})