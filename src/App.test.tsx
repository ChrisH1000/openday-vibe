import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders the Home component', () => {
    render(<App />)
    // Since Home component renders "OpenDay 2025", this confirms App is rendering Home
    expect(screen.getByText('OpenDay 2025')).toBeInTheDocument()
  })
})