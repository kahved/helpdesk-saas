import type { Request, Response } from "express";
import { listTickets } from "../services/ticket.service.js";
import type { TicketPriority } from "../types/ticket.types.js";

function isTicketPriority(value: unknown): value is TicketPriority {
    return value === "low" || value === "medium" || value === "high" || value === "urgent";
}

export async function getTickets(req: Request, res: Response): Promise<void> {
    const { priority } = req.query;
    if (priority !== undefined && !isTicketPriority(priority)) {
        res.status(400).json({ message: "Invalid priority. Expected low, medium, high, or urgent." });
        return;
    }

    const tickets = await listTickets(priority);
    res.status(200).json(tickets);
}

