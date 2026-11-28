import request from "supertest";
import { beforeEach, expect, test, vi } from "vitest";
import app from "../../app.js";

const { query } = vi.hoisted(() => ({
    query: vi.fn<(sql: string, params?: string[]) => Promise<{ rows: typeof tickets }>>(),
}));

vi.mock("../../config/db.js", () => ({ pool: { query } }));

const tickets = [
    { id: 1, title: "Login problem", priority: "urgent" },
    { id: 2, title: "Payment problem", priority: "medium" },
];

beforeEach(() => query.mockReset());

test("returns all tickets without a priority filter", async () => {
    query.mockResolvedValueOnce({ rows: tickets });

    const response = await request(app).get("/api/tickets").expect(200);

    expect(response.body).toEqual(tickets);
    expect(query.mock.calls).toEqual([[expect.not.stringContaining("WHERE tickets.priority")]]);
});

test("returns urgent tickets using a parameterized priority filter", async () => {
    const urgent = tickets.filter((ticket) => ticket.priority === "urgent");
    query.mockResolvedValueOnce({ rows: urgent });

    const response = await request(app).get("/api/tickets?priority=urgent").expect(200);

    expect(response.body).toEqual(urgent);
    expect(query).toHaveBeenCalledWith(expect.stringContaining("WHERE tickets.priority = $1"), ["urgent"]);
});

test.each(["invalid", "", "urgent&priority=low"])("rejects invalid priority: %s", async (priority) => {
    const response = await request(app).get(`/api/tickets?priority=${priority}`).expect(400);

    expect(response.body.message).toMatch(/invalid priority/i);
    expect(query).not.toHaveBeenCalled();
});