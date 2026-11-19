import { getAllTickets } from "../repositories/ticket.repository.js";

export function listTickets() {
    return getAllTickets();
}
