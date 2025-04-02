import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import SignUp from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

describe('SignUp Page', () => {
  const mockRouter = {
    push: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue(mockRouter as any)
  })

  it('renders the signup form', () => {
    render(<SignUp />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('handles successful form submission', async () => {
    // Mock successful API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', name: 'Test User', email: 'test@example.com' })
    })

    render(<SignUp />)

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    // Wait for navigation
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/auth/signin')
    })
  })

  it('displays error message on failed submission', async () => {
    // Mock failed API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve('Email already exists')
    })

    render(<SignUp />)

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    })

    // Verify no navigation occurred
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('displays loading state during submission', async () => {
    // Mock delayed API response
    global.fetch = vi.fn().mockImplementation(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<SignUp />)

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    // Verify loading state
    expect(screen.getByRole('button', { name: /creating account\.\.\./i })).toBeDisabled()
  })
})