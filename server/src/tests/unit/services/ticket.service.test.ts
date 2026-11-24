import { test, expect, vi } from "vitest";
import { getAllTickets } from "../../../repositories/ticket.repository.js";

const fakeTickets = [
    { id: 1, title: "Login problem" },
    { id: 2, title: "Payment problem" },
];
vi.mock("../../../repositories/ticket.repository.js", () => ({
    getAllTickets: vi.fn().mockResolvedValue([
        { id: 1, title: "Login problem" },
        { id: 2, title: "Payment problem" },
    ]),
}));


test("returns tickets from repository", async () => {
    const result = await getAllTickets();

    expect(result).toEqual([
        { id: 1, title: "Login problem" },
        { id: 2, title: "Payment problem" },
    ]);
});
