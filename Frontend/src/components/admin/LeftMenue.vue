<template>
  <nav class="col-md-3 col-lg-2 d-md-block admin-sidebar p-0">
    <div class="d-flex flex-column h-100 p-3">
      <router-link to="/" class="navbar-brand fs-4 fw-bold mb-4 text-white"
        >AdminPanel</router-link
      >
      <ul class="nav flex-column mb-auto">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">
            <i class="fas fa-tachometer-alt me-2"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/users">
            <i class="fas fa-users me-2"></i> Users
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <Document_upload />
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/get_quotes">
            <i class="fas fa-file-alt me-2"></i> Quotes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/settings">
            <i class="fas fa-cogs me-2"></i> Settings
          </router-link>
        </li>
      </ul>
      <div class="mt-auto">
        <a href="#" class="nav-link text-white" @click.prevent="logout">
          <i class="fas fa-sign-out-alt me-2"></i> Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import Document_upload from "./Document_upload.vue";
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/admin/login");
    },
  },
  components: {
    Document_upload: Document_upload,
  },
};
</script>
