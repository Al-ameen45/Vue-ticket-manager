<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login to Your Account</h2>
      <p style="text-align: center; color: #6b7280; margin-bottom: 2rem">
        Welcome back! Please enter your credentials.
      </p>

      <form @submit.prevent="handleSubmit">
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
            placeholder="Enter your password"
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

        <button
          type="submit"
          class="btn btn-primary"
          style="width: 100%; margin-top: 1rem"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <div class="auth-link">
        <p>
          Don't have an account?
          <router-link to="/auth/signup">Sign up here</router-link>
        </p>
      </div>

      <div
        style="
          margin-top: 2rem;
          padding: 12px;
          background-color: #f3f4f6;
          border-radius: 8px;
          font-size: 0.875rem;
        "
      >
        <p style="font-weight: 600; margin-bottom: 8px">Demo Credentials:</p>
        <p>Email: demo@ticket.com</p>
        <p>Password: demo123</p>
        <p style="margin-top: 8px; font-size: 0.75rem; color: #6b7280">
          (Or create a new account)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      loading: false,
    };
  },
  methods: {
    validate() {
      const newErrors = {};

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
          const user = users.find(
            (u) => u.email === this.email && u.password === this.password
          );
          if (user) {
            localStorage.setItem(
              "ticketapp_session",
              JSON.stringify({ id: user.id, email: user.email })
            );
            this.$router.push("/dashboard");
          } else {
            this.errors = {
              password:
                "Invalid credentials. Please check your email and password.",
            };
          }
        } catch (error) {
          this.errors = { password: "Login failed. Please try again." };
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
