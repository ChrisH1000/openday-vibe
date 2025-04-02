import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createUsersTable, createUser, getUserByEmail } from './db'
import { neon } from '@neondatabase/serverless'

// Mock neon database
vi.mock('@neondatabase/serverless', () => ({
  neon: vi.fn()
}))

describe('Database Utilities', () => {
  const mockSql = vi.fn()
  const sql = Object.assign(mockSql, {
    query: mockSql,
    unsafe: mockSql,
    transaction: mockSql,
    [Symbol.for('sql')]: (strings: TemplateStringsArray, ...values: any[]) => {
      return mockSql(strings.join('?'), values)
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(neon).mockReturnValue(sql)
  })

  describe('createUsersTable', () => {
    it('creates users table successfully', async () => {
      mockSql.mockResolvedValueOnce([])
      await createUsersTable()
      expect(mockSql).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS users'))
    })

    it('handles errors when creating table', async () => {
      const error = new Error('Database error')
      mockSql.mockRejectedValueOnce(error)

      await expect(createUsersTable()).rejects.toThrow('Database error')
    })
  })

  describe('createUser', () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      isAdmin: false
    }

    it('creates a new user successfully', async () => {
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin
      }

      mockSql.mockResolvedValueOnce([mockUser])

      const result = await createUser(userData)

      expect(result).toEqual(mockUser)
      expect(mockSql).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO users'))
    })

    it('handles errors when creating user', async () => {
      const error = new Error('Database error')
      mockSql.mockRejectedValueOnce(error)

      await expect(createUser(userData)).rejects.toThrow('Database error')
    })
  })

  describe('getUserByEmail', () => {
    it('retrieves user by email successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        isAdmin: false
      }

      mockSql.mockResolvedValueOnce([mockUser])

      const result = await getUserByEmail('test@example.com')

      expect(result).toEqual(mockUser)
      expect(mockSql).toHaveBeenCalledWith(expect.stringContaining('SELECT'))
    })

    it('returns null when user not found', async () => {
      mockSql.mockResolvedValueOnce([])

      const result = await getUserByEmail('nonexistent@example.com')

      expect(result).toBeNull()
    })

    it('handles errors when retrieving user', async () => {
      const error = new Error('Database error')
      mockSql.mockRejectedValueOnce(error)

      await expect(getUserByEmail('test@example.com')).rejects.toThrow('Database error')
    })
  })
})