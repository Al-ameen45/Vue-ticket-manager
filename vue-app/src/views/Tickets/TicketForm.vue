<template>
  <div class="ticket-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title *</label>
        <input
          id="title"
          v-model="form.title"
          :class="['form-control', { error: errors.title }]"
          type="text"
          placeholder="Enter ticket title"
          :aria-invalid="errors.title ? 'true' : 'false'"
        />
        <span v-if="errors.title" class="error-message" role="alert">
          {{ errors.title }}
        </span>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          :class="['form-control', { error: errors.description }]"
          maxlength="500"
          rows="4"
          placeholder="Enter ticket description (optional)"
          :aria-invalid="errors.description ? 'true' : 'false'"
        ></textarea>
        <span v-if="errors.description" class="error-message" role="alert">
          {{ errors.description }}
        </span>
      </div>

      <div class="form-group">
        <label for="status">Status *</label>
        <select
          id="status"
          v-model="form.status"
          :class="['form-control', { error: errors.status }]"
          :aria-invalid="errors.status ? 'true' : 'false'"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <span v-if="errors.status" class="error-message" role="alert">
          {{ errors.status }}
        </span>
      </div>

      <div class="form-group">
        <label for="priority">Priority</label>
        <select id="priority" v-model="form.priority" class="form-control">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="modal-actions">
        <button
          class="btn btn-secondary"
          type="button"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button class="btn btn-primary" type="submit">
          {{ initial ? "Update Ticket" : "Create Ticket" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["initial"],
  data() {
    return {
      form: {
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      },
      errors: {},
    };
  },
  watch: {
    initial: {
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
          // Ensure priority has a default value for existing tickets
          if (!this.form.priority) {
            this.form.priority = "medium";
          }
        } else {
          this.form = {
            title: "",
            description: "",
            status: "open",
            priority: "medium",
          };
        }
      },
      immediate: true,
    },
  },
  methods: {
    validate() {
      const newErrors = {};

      if (!this.form.title.trim()) {
        newErrors.title = "Title is required";
      } else if (this.form.title.trim().length < 3) {
        newErrors.title = "Title must be at least 3 characters";
      }

      if (!["open", "in_progress", "closed"].includes(this.form.status)) {
        newErrors.status = "Status must be one of: open, in_progress, closed";
      }

      if (this.form.description && this.form.description.length > 500) {
        newErrors.description = "Description must not exceed 500 characters";
      }

      return newErrors;
    },
    submitForm() {
      const validationErrors = this.validate();
      this.errors = validationErrors;

      if (Object.keys(validationErrors).length === 0) {
        this.$emit("save", { ...this.form });
      }
    },
  },
};
</script>

<style scoped>
.ticket-form {
  padding: 0 1.5rem 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-group textarea {
  resize: vertical;
  min-height: 100px;
}
.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

@media (max-width: 480px) {
  .modal-actions {
    flex-direction: column;
  }
  .modal-actions button {
    width: 100%;
  }
}
</style>
