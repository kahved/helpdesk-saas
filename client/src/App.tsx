import { useEffect, useState } from 'react'
import { fetchTickets } from './api/tickets'
import { TicketTable } from './components/TicketTable'
import type { Ticket } from './types/ticket'
import './App.css'

type TicketListState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; tickets: Ticket[] }

function App() {
  const [state, setState] = useState<TicketListState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchTickets(controller.signal)
      .then((tickets) => {
        if (!controller.signal.aborted) setState({ status: 'ready', tickets })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return (
    <>
      <header className="app-header">
        <div className="layout"><span className="headset" aria-hidden="true" />Helpdesk</div>
      </header>
      <main className="layout ticket-page">
        <h1>Support tickets</h1>
        <p className="intro">Manage customer support requests.</p>
        {state.status === 'loading' && <p className="notice" role="status">Loading tickets…</p>}
        {state.status === 'error' && (
          <div className="notice">
            <p role="alert">{state.message}</p>
            <button type="button" onClick={retry}>Try again</button>
          </div>
        )}
        {state.status === 'ready' && (
          <>
            <dl className="summary">
              <div><dt>Total tickets</dt><dd>{state.tickets.length}</dd></div>
              <div><dt>Open</dt><dd>{state.tickets.filter((ticket) => ticket.status === 'open').length}</dd></div>
              <div><dt>Resolved</dt><dd>{state.tickets.filter((ticket) => ticket.status === 'resolved').length}</dd></div>
              <div><dt>Unassigned</dt><dd>{state.tickets.filter((ticket) => ticket.assignee_name === null).length}</dd></div>
            </dl>
            <TicketTable tickets={state.tickets} />
          </>
        )}
      </main>
    </>
  )
}

export default App
