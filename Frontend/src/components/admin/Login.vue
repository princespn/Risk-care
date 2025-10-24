<script setup>
import login from "/src/assets/images/login.jpg";
</script>


<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
            <div class="border border-1 p-0 overflow-hidden"
                style="max-width: 700px; width: 100%; border-radius: 18px;">
                <div class="row g-0 align-items-center">
                    <div class="col-md-6 d-none d-md-block bg-light text-center p-4">
                        <img :src="login" alt="Login Illustration" class="img-fluid"
                            style="max-height: 320px; object-fit: contain;" />
                    </div>
                    <div class="col-md-6 col-12 p-4">
                        <div class="text-center mb-4">
                            <h2 class="primary-color fw-bold mb-2">Login</h2>
                                <div v-if="Object.keys(validationErrors).length != 0" class="alert alert-danger text-center">
          <p>Incorrect Email or Password</p>
                     </div>
                               <form @submit.prevent="loginAction">
                            <div class="mb-3">
                                <!---<label for="loginEmail" class="form-label">Email address</label>-->
                                <input type="email"  v-model="email"  class="form-control custom-input" id="loginEmail"
                                    placeholder="Enter your email" required />
                            </div>
                            <div class="mb-3">
                                <!----<label for="loginPassword" class="form-label">Password</label>-->
                                <input v-model="password" type="password" class="form-control custom-input" id="loginPassword"
                                    placeholder="Enter your password" required />
                            </div>
                            <button :disabled="isSubmitting" type="submit" class="btn custom-quote-btn w-100 mb-2">Login</button>
                        </form>
                       <!-- <div class="text-center mt-3">
                            <span class="text-muted">Don't have an account?</span>
                            <a href="register.html" class="primary-color fw-bold text-decoration-none">Register</a>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      validationErrors: {},
      isSubmitting: false,
    };
  },

  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/admin/dashboard");
    }
  },

  methods: {
    async loginAction() {
      this.validationErrors = {};
      this.isSubmitting = true;

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {  email: this.email,
          password: this.password, });
        
              const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          this.$router.push("/admin/dashboard");
        } else {
          this.validationErrors.general = "Login failed. Invalid response.";
        }
      } catch (error) {
        this.isSubmitting = false;
        this.validationErrors =
          error.response?.data?.errors || { general: "Invalid email or password" };
      }
    },
  },
};
</script>
