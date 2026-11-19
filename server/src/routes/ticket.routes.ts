import { Router } from "express";
import { getTickets } from "../controllers/ticket.controller.js";

export const ticketRouter = Router();

ticketRouter.get("/", getTickets);
