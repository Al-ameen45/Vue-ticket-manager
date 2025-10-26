<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create Your Account</h2>
      <p style="text-align: center; color: #6b7280; margin-bottom: 2rem">
        Join us today and start managing your tickets efficiently!
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            :class="['form-control', { error: errors.name }]"
            v-model="name"
            placeholder="John Doe"
            :aria-invalid="errors.name ? 'true' : 'false'"
            :aria-describedby="errors.name ? 'name-error' : undefined"
          />
          <span
            v-if="errors.name"
            id="name-error"
            class="error-message"
            role="alert"
          >
            {{ errors.name }}
          </span>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            :class="['form-control', { error: errors.email }]"
            v-model="email"
            placeholder="your@email.com"
            :aria-invalid="errors.email ? 'true' : 'false'"
            :aria-describedby="errors.email ? 'email-error' : undefined"
          />
          <span
            v-if="errors.email"
            id="email-error"
            class="error-message"
            role="alert"
          >
            {{ errors.email }}
          </span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            :class="['form-control', { error: errors.password }]"
            v-model="password"
            placeholder="At least 6 characters"
            :aria-invalid="errors.password ? 'true' : 'false'"
            :aria-describedby="errors.password ? 'password-error' : undefined"
          />
          <span
            v-if="errors.password"
            id="password-error"
            class="error-message"
            role="alert"
          >
            {{ errors.password }}
          </span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            :class="['form-control', { error: errors.confirmPassword }]"
            v-model="confirmPassword"
            placeholder="Re-enter your password"
            :aria-invalid="errors.confirmPassword ? 'true' : 'false'"
            :aria-describedby="
              errors.confirmPassword ? 'confirm-password-error' : undefined
            "
          />
          <span
            v-if="errors.confirmPassword"
            id="confirm-password-error"
            class="error-message"
            role="alert"
          >
            {{ errors.confirmPassword }}
          </span>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="width: 100%; margin-top: 1rem"
          :disabled="loading"
        >
          {{ loading ? "Creating Account..." : "Sign Up" }}
        </button>
      </form>

      <div class="auth-link">
        <p>
          Already have an account?
          <router-link to="/auth/login">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      loading: false,
    };
  },
  methods: {
    validate() {
      const newErrors = {};

      if (!this.name.trim()) {
        newErrors.name = "Name is required";
      } else if (this.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!this.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        newErrors.email = "Email is invalid";
      }

      if (!this.password.trim()) {
        newErrors.password = "Password is required";
      } else if (this.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!this.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (this.password !== this.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      return newErrors;
    },
    async handleSubmit() {
      const newErrors = this.validate();
      this.errors = newErrors;

      if (Object.keys(newErrors).length === 0) {
        this.loading = true;
        try {
          const users = JSON.parse(
            localStorage.getItem("ticketapp_users") || "[]"
          );
          if (users.find((u) => u.email === this.email)) {
            this.errors = { email: "Email already exists" };
            this.loading = false;
            return;
          }
          const newUser = {
            id: uuidv4(),
            name: this.name,
            email: this.email,
            password: this.password,
          };
          users.push(newUser);
          localStorage.setItem("ticketapp_users", JSON.stringify(users));
          localStorage.setItem(
            "ticketapp_session",
            JSON.stringify({
              id: newUser.id,
              email: newUser.email,
            })
          );
          this.$router.push("/dashboard");
        } catch (error) {
          this.errors = { email: "Signup failed. Please try again." };
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
