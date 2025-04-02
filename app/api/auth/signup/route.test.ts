import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { createUser, getUserByEmail, createUsersTable, User } from '@/lib/db'
import bcrypt from 'bcryptjs'

// Mock database functions
vi.mock('@/lib/db', () => ({
  createUser: vi.fn<[{ email: string; name: string; password: string; isAdmin?: boolean }], Promise<User>>(),
  getUserByEmail: vi.fn<[string], Promise<User | undefined>>(),
  createUsersTable: vi.fn<[], Promise<void>>()
}))

// Mock bcrypt
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashedPassword')
  }
}))

describe('Signup API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 if fields are missing', async () => {
    const request = new Request('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' })
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Missing fields')
  })

  it('returns 400 if email already exists', async () => {
    const existingUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      isAdmin: false
    }
    vi.mocked(getUserByEmail).mockResolvedValueOnce(existingUser)

    const request = new Request('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Email already exists')
  })

  it('creates a new user successfully', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce(undefined)
    const newUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      isAdmin: false
    }
    vi.mocked(createUser).mockResolvedValueOnce(newUser)

    const request = new Request('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toEqual(newUser)
  })

  it('handles internal server errors', async () => {
    vi.mocked(getUserByEmail).mockRejectedValueOnce(new Error('Database error'))

    const request = new Request('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    expect(await response.text()).toBe('Internal error')
  })
})