import type { Request, Response } from "express";
import { listTickets } from "../services/ticket.service.js";

export async function getTickets(_req: Request, res: Response): Promise<void> {
    const tickets = await listTickets();
    res.status(200).json(tickets);
}
