<template>
  <div>
    <header class="hero-section">
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>

      <div class="hero-content app-container">
        <h1>Ticket Manager</h1>
        <p>
          Streamline your workflow with our powerful ticket management system.
          Track, organize, and resolve tickets with ease across multiple
          platforms.
        </p>
        <div class="hero-buttons">
          <router-link to="/auth/login" class="btn btn-primary"
            >Login</router-link
          >
          <router-link to="/auth/signup" class="btn btn-primary"
            >Get Started</router-link
          >
        </div>
      </div>
    </header>

    <main class="app-container" style="padding: 60px 20px">
      <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem">
        Why Choose Ticket Manager?
      </h2>
      <div class="grid grid-3">
        <div class="card">
          <div style="font-size: 3rem; margin-bottom: 1rem">📋</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
            Easy Organization
          </h3>
          <p style="color: #6b7280">
            Keep all your tickets organized in one place. Create, update, and
            track the status of every ticket effortlessly.
          </p>
        </div>

        <div class="card">
          <div style="font-size: 3rem; margin-bottom: 1rem">⚡</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 1rem">Lightning Fast</h3>
          <p style="color: #6b7280">
            Built with modern technologies for optimal performance. Get instant
            updates and seamless user experience.
          </p>
        </div>

        <div class="card">
          <div style="font-size: 3rem; margin-bottom: 1rem">🔒</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 1rem">
            Secure & Reliable
          </h3>
          <p style="color: #6b7280">
            Your data is protected with industry-standard security practices.
            Access your tickets anytime, anywhere.
          </p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 4rem">
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem">
          Ready to Get Started?
        </h2>
        <router-link
          to="/auth/signup"
          class="btn btn-primary"
          style="font-size: 1.125rem; padding: 14px 40px"
        >
          Create Your Account Now
        </router-link>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  name: "Landing",
  components: {
    Footer,
  },
};
</script>
