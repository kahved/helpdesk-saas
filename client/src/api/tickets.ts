import type { Ticket } from '../types/ticket'

export async function fetchTickets(signal: AbortSignal): Promise<Ticket[]> {
  const response = await fetch('/api/tickets', { signal })

  if (!response.ok) {
    throw new Error(`Could not load support tickets (HTTP ${response.status}).`)
  }

  return response.json()
}
