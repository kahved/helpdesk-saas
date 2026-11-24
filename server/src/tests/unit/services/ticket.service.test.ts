import { test, expect, vi } from 'vitest'
import { listTickets } from '../../../services/ticket.service.js'

vi.mock('../../../repositories/ticket.repository.js', () => ({
  getAllTickets: vi.fn().mockResolvedValue([])
}))

test('returns tickets from repository', async () => {
  const result = await listTickets()

  expect(result).toEqual([])
})