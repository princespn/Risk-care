<script setup>
import LeftMenue from './LeftMenue.vue';
</script>
<template>
      <div class="row min-vh-100">
   <LeftMenue></LeftMenue>

    <!-- <div id="page-content-wrapper" class="w-100">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
        <button class="btn btn-primary" @click="toggleSidebar">☰</button>
      </nav>

      <div class="container-fluid mt-4">

        <router-view />
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "DashboardLayout",
  methods: {
    toggleSidebar() {
      const wrapper = document.getElementById("wrapper");
      wrapper.classList.toggle("toggled");
    },
     logout() {
      localStorage.removeItem("token");        // Remove token
      this.$router.push("/login");             // Redirect to login
    }
  }
};
</script>

<style scoped>
#wrapper {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
}
#sidebar-wrapper {
  min-width: 250px;
  max-width: 250px;
}
#page-content-wrapper {
  flex: 1;
}
@media (max-width: 768px) {
  #sidebar-wrapper {
    margin-left: -250px;
    transition: margin 0.3s;
  }
  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }
}
</style>
