import type { Ticket } from '../types/ticket'

const statusLabels: Record<Ticket['status'], string> = {
  open: 'Open',
  in_progress: 'In progress',
  waiting_for_customer: 'Waiting for customer',
  resolved: 'Resolved',
  closed: 'Closed',
}

const priorityLabels: Record<Ticket['priority'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <section className="ticket-panel" aria-labelledby="ticket-heading">
      <div className="panel-heading">
        <h2 id="ticket-heading">All tickets</h2>
        <span className="result-count">
          {tickets.length} {tickets.length === 1 ? 'result' : 'results'}
        </span>
      </div>
      {tickets.length === 0 ? (
        <p className="notice" role="status">No support tickets yet.</p>
      ) : (
        <div className="table-container" role="region" aria-labelledby="ticket-heading" tabIndex={0}>
          <table aria-labelledby="ticket-heading">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Customer</th>
                <th scope="col">Assignee</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <th scope="row">
                    {ticket.title}
                    <span className="ticket-id">#{ticket.id}</span>
                  </th>
                  <td>{ticket.customer_name}</td>
                  <td>{ticket.assignee_name ?? 'Unassigned'}</td>
                  <td className={`status-${ticket.status}`}>{statusLabels[ticket.status]}</td>
                  <td className={`priority-${ticket.priority}`}>{priorityLabels[ticket.priority]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
