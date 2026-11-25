import type { Request, Response } from "express";
import { listTickets } from "../services/ticket.service.js";

export async function getTickets(req: Request, res: Response): Promise<void> {
const { priority } = req.query;
if (priority){
    
}
    const tickets = await listTickets();
    res.status(200).json(tickets);
}

