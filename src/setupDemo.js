// Setup demo data for the Vue app
import { v4 as uuidv4 } from "uuid";

export function setupDemoData() {
  // Create demo user if it doesn't exist
  const existingUsers = JSON.parse(
    localStorage.getItem("ticketapp_users") || "[]"
  );
  if (existingUsers.length === 0) {
    const demoUser = {
      id: uuidv4(),
      name: "Demo User",
      email: "demo@ticket.com",
      password: "demo123",
    };
    localStorage.setItem("ticketapp_users", JSON.stringify([demoUser]));
  }

  // Create demo tickets if they don't exist
  const existingTickets = JSON.parse(
    localStorage.getItem("ticketapp_tickets") || "[]"
  );
  if (existingTickets.length === 0) {
    const demoTickets = [
      {
        id: uuidv4(),
        title: "Welcome to Vue Ticket Manager",
        description:
          "This is a demo ticket to get you started. Feel free to edit or delete it!",
        status: "open",
        createdAt: Date.now(),
      },
      {
        id: uuidv4(),
        title: "Fix responsive design",
        description: "Make sure the app works well on mobile devices.",
        status: "in_progress",
        createdAt: Date.now() - 86400000,
      },
      {
        id: uuidv4(),
        title: "Add user authentication",
        description: "Implement secure login and registration system.",
        status: "closed",
        createdAt: Date.now() - 172800000,
      },
    ];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(demoTickets));
  }
}
