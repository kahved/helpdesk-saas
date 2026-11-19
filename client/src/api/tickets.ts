import type { Ticket } from '../types/ticket'

const statuses: readonly Ticket['status'][] = [
  'open', 'in_progress', 'waiting_for_customer', 'resolved', 'closed',
]
const priorities: readonly Ticket['priority'][] = ['low', 'medium', 'high', 'urgent']

function isTicket(value: unknown): value is Ticket {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const ticket: Record<string, unknown> = value as Record<string, unknown>

  return (
    typeof ticket.id === 'number' &&
    Number.isInteger(ticket.id) &&
    typeof ticket.title === 'string' &&
    typeof ticket.customer_name === 'string' &&
    (typeof ticket.assignee_name === 'string' || ticket.assignee_name === null) &&
    statuses.some((status) => status === ticket.status) &&
    priorities.some((priority) => priority === ticket.priority) &&
    typeof ticket.created_at === 'string' &&
    isSerializedDate(ticket.created_at)
  )
}

function isSerializedDate(value: string): boolean {
  const date = new Date(value)
  return Number.isFinite(date.getTime()) && date.toISOString() === value
}

export async function fetchTickets(signal: AbortSignal): Promise<Ticket[]> {
  const response = await fetch('/api/tickets', { signal })

  if (!response.ok) {
    throw new Error(`Could not load support tickets (HTTP ${response.status}).`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || !data.every(isTicket)) {
    throw new Error('The support tickets API returned an invalid response.')
  }

  return data
}
