import { getAllTickets } from "../repositories/ticket.repository.js";
import { TicketPriority } from "../types/ticket.types.js";
export function listTickets() {
    return getAllTickets();
}

export function getTicketWithPriorityService(priority:TicketPriority) {
   return getTicketWithPriorityRepo(priority)
}