import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByText('OpenDay 2025')).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<Home />)
    expect(screen.getByText('Join us for the biggest tech event of the year')).toBeInTheDocument()
  })

  it('renders the sign in and sign up buttons', () => {
    render(<Home />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('renders the background image', () => {
    render(<Home />)
    const image = screen.getByAltText('Background')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('images.unsplash.com'))
  })
})