export interface TicketListItem {
    id: number;
    title: string;
    customer_name: string;
    assignee_name: string | null;
    status: "open" | "in_progress" | "waiting_for_customer" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "urgent";
    created_at: Date;
}
