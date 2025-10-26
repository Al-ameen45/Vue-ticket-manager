<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/dashboard" class="navbar-brand">
        Ticket Manager
      </router-link>

      <div class="navbar-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/tickets">Tickets</router-link>
        <button
          @click="logout"
          class="btn btn-danger btn-small"
          style="margin-left: 1rem"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.removeItem("ticketapp_session");
      this.$router.push("/");
    },
  },
};
</script>
