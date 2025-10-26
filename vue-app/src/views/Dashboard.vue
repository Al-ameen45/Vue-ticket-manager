<template>
  <div>
    <Navbar />
    <div class="page-container">
      <div class="app-container">
        <div class="dashboard-header">
          <h1 class="page-title">
            Welcome back, {{ user?.name || "User" }}! 👋
          </h1>
          <p class="dashboard-subtitle">
            Here's an overview of your ticket management system
          </p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ stats.total }}</h3>
            <p>Total Tickets</p>
          </div>

          <div class="stat-card stat-open">
            <h3>{{ stats.open }}</h3>
            <p>Open Tickets</p>
          </div>

          <div class="stat-card stat-progress">
            <h3>{{ stats.in_progress }}</h3>
            <p>In Progress</p>
          </div>

          <div class="stat-card stat-closed">
            <h3>{{ stats.closed }}</h3>
            <p>Resolved Tickets</p>
          </div>
        </div>

        <div style="margin-top: 3rem">
          <div class="card">
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem">
              Quick Actions
            </h2>
            <p style="color: #6b7280; margin-bottom: 1.5rem">
              Manage your tickets efficiently with these quick links
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap">
              <router-link to="/tickets" class="btn btn-primary">
                View All Tickets
              </router-link>
              <router-link to="/tickets?action=create" class="btn btn-success">
                Create New Ticket
              </router-link>
            </div>
          </div>
        </div>

        <div style="margin-top: 3rem">
          <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem">
            Recent Activity
          </h2>
          <div class="grid grid-2">
            <div class="card">
              <h3
                style="
                  font-size: 1.25rem;
                  margin-bottom: 0.5rem;
                  color: #10b981;
                "
              >
                ✅ System Status
              </h3>
              <p style="color: #6b7280">
                All systems operational. Your tickets are being tracked and
                managed efficiently.
              </p>
            </div>

            <div class="card">
              <h3
                style="
                  font-size: 1.25rem;
                  margin-bottom: 0.5rem;
                  color: #4f46e5;
                "
              >
                📊 Performance
              </h3>
              <p style="color: #6b7280">
                You have {{ stats.open }} open tickets that need attention. Keep
                up the great work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      stats: { total: 0, open: 0, in_progress: 0, closed: 0 },
      user: null,
    };
  },
  created() {
    this.loadUserInfo();
    this.calculateStats();
  },
  methods: {
    loadUserInfo() {
      const session = JSON.parse(
        localStorage.getItem("ticketapp_session") || "{}"
      );
      if (session.id) {
        const users = JSON.parse(
          localStorage.getItem("ticketapp_users") || "[]"
        );
        this.user = users.find((u) => u.id === session.id);
      }
    },
    calculateStats() {
      const tickets = JSON.parse(
        localStorage.getItem("ticketapp_tickets") || "[]"
      );
      this.stats = {
        total: tickets.length,
        open: 0,
        in_progress: 0,
        closed: 0,
      };
      tickets.forEach((t) => {
        this.stats[t.status] = (this.stats[t.status] || 0) + 1;
      });
    },
  },
};
</script>

<style scoped>
.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
}

.stat-open {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-progress {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stat-closed {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}
</style>
