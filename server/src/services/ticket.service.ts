import { getAllTickets, getTicketWithPriorityRepo } from "../repositories/ticket.repository.js";
import type { TicketPriority } from "../types/ticket.types.js";

export function listTickets(priority?: TicketPriority) {
    if (priority === undefined) {
        return getAllTickets();
    }

    return getTicketWithPriorityRepo(priority);
}