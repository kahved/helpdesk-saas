import express from "express";
import { ticketRouter } from "./routes/ticket.routes.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use("/api/tickets", ticketRouter);

app.get("/", (_req, res) => {
    res.json({ message: "Helpdesk API is running" });
});

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "helpdesk-api",
    });
});

app.listen(port, "127.0.0.1", () => {
    console.log(`Helpdesk API listening on port ${port}`);
});
