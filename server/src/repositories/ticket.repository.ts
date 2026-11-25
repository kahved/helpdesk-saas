import { pool } from "../config/db.js";
import type { TicketListItem , TicketPriority} from "../types/ticket.types.js";

export async function getAllTickets(): Promise<TicketListItem[]> {
    const { rows } = await pool.query<TicketListItem>(`
        SELECT
            tickets.id,
            tickets.title,
            customer.name AS customer_name,
            assignee.name AS assignee_name,
            tickets.status,
            tickets.priority,
            tickets.created_at
        FROM tickets
        JOIN users AS customer ON customer.id = tickets.customer_id
        LEFT JOIN users AS assignee ON assignee.id = tickets.assignee_id
        ORDER BY tickets.id
    `);

    return rows;
}


export async function getTicketWithPriorityRepo(priority: TicketPriority): Promise<TicketListItem[]>{
    const { rows } = await pool.query<TicketListItem>(`
        SELECT
            tickets.id,
            tickets.title,
            customer.name AS customer_name,
            assignee.name AS assignee_name,
            tickets.status,
            tickets.priority,
            tickets.created_at
        FROM tickets
        JOIN users AS customer ON customer.id = tickets.customer_id
        LEFT JOIN users AS assignee ON assignee.id = tickets.assignee_id
        ORDER BY tickets.id WHERE tickets.priority = $1
    `, [priority]);

    return rows;
}