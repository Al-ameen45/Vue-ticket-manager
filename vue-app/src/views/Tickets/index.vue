<template>
  <div>
    <Navbar />
    <div class="page-container">
      <div class="app-container">
        <div class="page-header">
          <h1 class="page-title">Ticket Management</h1>
          <button @click="openCreate" class="btn btn-success">
            + Create New Ticket
          </button>
        </div>

        <div v-if="tickets.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h2 class="empty-title">No Tickets Yet</h2>
          <p class="empty-description">
            Get started by creating your first ticket
          </p>
          <button @click="openCreate" class="btn btn-primary">
            Create Your First Ticket
          </button>
        </div>

        <div v-else class="ticket-list">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            :class="['ticket-card', ticket.status]"
          >
            <div class="ticket-header">
              <h3>{{ ticket.title }}</h3>
              <span :class="['status-badge', `status-${ticket.status}`]">
                {{ formatStatus(ticket.status) }}
              </span>
            </div>

            <p v-if="ticket.description" class="ticket-description">
              {{ ticket.description }}
            </p>

            <div class="ticket-meta">
              Created: {{ formatDate(ticket.createdAt) }}
            </div>

            <div class="ticket-actions">
              <button
                @click="openEdit(ticket)"
                class="btn btn-primary btn-small"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(ticket.id)"
                class="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editing ? "Edit Ticket" : "Create New Ticket" }}</h2>
          <button
            class="modal-close"
            @click="closeForm"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <TicketForm :initial="editing" @save="saveTicket" @cancel="closeForm" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="deleteConfirm"
      class="modal-overlay"
      @click.self="() => (deleteConfirm = null)"
    >
      <div class="modal-content delete-modal" @click.stop>
        <div class="modal-header">
          <h2>Confirm Delete</h2>
          <button
            class="modal-close"
            @click="deleteConfirm = null"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <p class="delete-warning">
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>

        <div class="modal-actions">
          <button @click="deleteConfirm = null" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="handleDelete" class="btn btn-danger">
            Delete Ticket
          </button>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Toast Notifications -->
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', toast.type]"
      >
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import TicketForm from "./TicketForm.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { Navbar, Footer, TicketForm },
  data() {
    return {
      tickets: [],
      showForm: false,
      editing: null,
      deleteConfirm: null,
      toasts: [],
    };
  },
  created() {
    this.load();
    // Check for query parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "create") {
      this.openCreate();
    }
  },
  methods: {
    load() {
      this.tickets = JSON.parse(
        localStorage.getItem("ticketapp_tickets") || "[]"
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    openCreate() {
      this.editing = null;
      this.showForm = true;
    },
    openEdit(ticket) {
      this.editing = { ...ticket };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editing = null;
    },
    saveTicket(payload) {
      if (!payload.id) {
        payload.id = uuidv4();
        payload.createdAt = Date.now();
        this.tickets.unshift(payload);
        this.showSuccess("Ticket created successfully!");
      } else {
        this.tickets = this.tickets.map((t) =>
          t.id === payload.id ? { ...payload } : t
        );
        this.showSuccess("Ticket updated successfully!");
      }
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
      this.closeForm();
    },
    confirmDelete(id) {
      this.deleteConfirm = id;
    },
    handleDelete() {
      this.tickets = this.tickets.filter((t) => t.id !== this.deleteConfirm);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
      this.deleteConfirm = null;
      this.showSuccess("Ticket deleted successfully!");
    },

    showSuccess(message) {
      const id = Date.now();
      this.toasts.push({
        id,
        type: "success",
        message,
      });

      setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },

    removeToast(id) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    },
    formatStatus(status) {
      return status.replace("_", " ");
    },
    formatDate(timestamp) {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 0 1.5rem 1.5rem;
}

.ticket-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.ticket-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  border-left: 4px solid var(--primary-color);
  border: 1px solid #f3f4f6;
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.ticket-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #111;
  font-weight: 600;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-open {
  background-color: #d1fae5;
  color: #065f46;
}

.status-in_progress {
  background-color: #fef3c7;
  color: #92400e;
}

.status-closed {
  background-color: #e5e7eb;
  color: #374151;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .ticket-list {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions button {
    width: 100%;
  }
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #111;
}

.empty-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Ticket Card Components */
.ticket-header {
  margin-bottom: 1rem;
}

.ticket-description {
  color: #6b7280;
  margin-bottom: 1rem;
}

.ticket-meta {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

/* Delete Modal */
.delete-modal {
  max-width: 400px;
}

.delete-warning {
  margin-bottom: 1.5rem;
  color: #6b7280;
}
</style>
