import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('Home Component', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByText('OpenDay 2025')).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<Home />)
    expect(screen.getByText('Join us for the biggest tech event of the year')).toBeInTheDocument()
  })

  it('renders the navigation buttons', () => {
    render(<Home />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('renders the header with logo', () => {
    render(<Home />)
    expect(screen.getByText('OpenDay')).toBeInTheDocument()
  })

  it('has correct styling classes for buttons', () => {
    render(<Home />)
    const signInButton = screen.getByText('Sign In')
    const signUpButton = screen.getByText('Sign Up')

    expect(signInButton).toHaveClass('text-gray-700', 'hover:text-gray-900')
    expect(signUpButton).toHaveClass('bg-blue-600', 'text-white', 'rounded-md', 'hover:bg-blue-700')
  })
})