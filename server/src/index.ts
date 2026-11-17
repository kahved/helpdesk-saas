import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Helpdesk API is running" });
});

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "helpdesk-api",
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Helpdesk API listening on port ${port}`);
});
