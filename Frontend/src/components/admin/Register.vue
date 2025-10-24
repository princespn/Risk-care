<template>
  <main class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card shadow-lg">
            <!-- Header -->
            <div class="card-header text-center bg-primary text-white">
              <h4 class="mb-0">Sign Up</h4>
              <p class="mb-0">Create your account</p>
            </div>

            <div class="card-body">
              <!-- Validation Errors -->
              <div v-if="Object.keys(validationErrors).length" class="alert alert-danger">
                <ul class="mb-0">
                  <li v-for="(error, key) in validationErrors" :key="key">{{ error[0] }}</li>
                </ul>
              </div>

              <!-- Registration Form -->
              <form @submit.prevent="registerAction">
                <div class="mb-3">
                  <label class="form-label">Full Name</label>
                  <input v-model="name" type="text" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model="email" type="email" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input v-model="password" type="password" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Confirm Password</label>
                  <input v-model="confirmPassword" type="password" class="form-control" required />
                </div>

                <div class="form-check mb-3">
                  <input type="checkbox" class="form-check-input" id="terms" required />
                  <label class="form-check-label" for="terms">
                    I agree to the <a href="#" class="text-primary">Terms and Conditions</a>
                  </label>
                </div>

                <button :disabled="isSubmitting" class="btn btn-primary w-100">
                  Register Now
                </button>
              </form>

              <!-- Login Redirect -->
              <p class="text-center mt-3">
                Already have an account?
                <router-link to="/login" class="text-primary">Sign in</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      validationErrors: {},
      isSubmitting: false,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async registerAction() {
      this.isSubmitting = true;
      try {
        const response = await axios.post("/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        });

        localStorage.setItem("token", response.data.token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.isSubmitting = false;
        this.validationErrors = error.response?.data?.errors || {};
      }
    },
  },
};
</script>


