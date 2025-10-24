<script setup>
import Homesidebar from './Homesidebar.vue';
</script>

<template>
  <div class="row min-vh-100">
    <Homesidebar />
    <div class="col-md-10 p-5 tab">

      <form @submit.prevent="HomeApplication" class="border border-2 p-1">
        <div class="row g-4 container mt-4">


          <div class="col-md-6">
            <input type="text" v-model="first_name" class="form-control" placeholder="Enter First Name." />
            <small v-if="errors.first_name" class="text-danger">{{ errors.first_name }}</small>
          </div>


          <div class="col-md-6">
            <input type="text" v-model="last_name" class="form-control" placeholder="Enter Last Name." />
            <small v-if="errors.last_name" class="text-danger">{{ errors.last_name }}</small>
          </div>


          <div class="col-md-6">
            <label class="form-label">Date of Birth</label>
            <div class="d-flex gap-2">
              <select v-model="dob_month" id="dob_month" class="form-select" aria-label="Date of birth">
                <option value="" selected="">Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select v-model="dob_day" class="form-select">
                <option value="">Day</option>
                <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
              </select>
              <select v-model="dob_year" class="form-select">
                <option value="">Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <small v-if="errors.dob" class="text-danger">{{ errors.dob }}</small>
          </div>


          <div class="col-md-6">
            <label>Who occupies this residence?</label>
            <select v-model="num_families" class="form-control form-control-lg">
              <option value="">Select</option>
              <option value="1">You and your family</option>
              <option value="2">Your family and another family</option>
              <option value="3">Your family and two other families</option>
              <option value="0">It is rented out / Used for commercial purposes</option>
            </select>
            <small v-if="errors.num_families" class="text-danger">{{ errors.num_families }}</small>
          </div>


          <div class="col-md-6">
            <label>When do you want to start the policy?</label>
            <input type="date" v-model="policy_star_date" class="form-control" />
            <small v-if="errors.policy_star_date" class="text-danger">{{ errors.policy_star_date }}</small>
          </div>

          <div class="col-md-6">
            <label> Do you have a current active policy?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2"
                :class="current_policy === 'Yes' ? 'btn-success' : 'btn-outline-success'"
                @click="current_policy = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="current_policy === 'No' ? 'btn-success' : 'btn-outline-success'"
                @click="current_policy = 'No'">No</button>

            </div>
          </div>

          <div v-if="current_policy === 'No'">
            <div class="col-md-6">
              <label>Have you ever had a home insurance policy?</label>
              <div class="d-flex gap-3">
                <button type="button" class="btn me-2"
                  :class="insurance_policy === 'Yes' ? 'btn-success' : 'btn-outline-success'"
                  @click="insurance_policy = 'Yes'">Yes</button>
                <button type="button" class="btn"
                  :class="insurance_policy === 'No' ? 'btn-success' : 'btn-outline-success'"
                  @click="insurance_policy = 'No'">No</button>
              </div>
            </div>
          </div>

          <template v-if="current_policy === 'Yes'">

            <div class="col-md-6">
              <label>How long have you had insurance without gaps?</label>
              <select id="years_with_insurance" v-model="years_with_insurance" class="form-select form-select-lg">
                <option value="">Select</option>
                <option value="0">Less than 1 year</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7">7 years</option>
                <option value="8">8 years</option>
                <option value="9">9 years</option>
                <option value="10">10 years</option>
                <option value="11">More than 10 years</option>
              </select>
            </div>

            <div class="col-md-6">
              <label>How long have you been insured with your current company?</label>
              <select id="years_with_company" v-model="years_with_company" class="form-select form-select-lg">
                <option value="">Select</option>
                <option value="0">Less than 1 year</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7">7 years</option>
                <option value="8">8 years</option>
                <option value="9">9 years</option>
                <option value="10">10 years</option>
                <option value="11">More than 10 years</option>
              </select>
            </div>

            <hr class="my-4" />
            <div class="custom-card my-4">
              <h6 class="fw-bold text-danger mb-2">
                <i class="fas fa-ban me-2"></i> Claims
              </h6>
              <div class="col-md-6">
                <label>Any claims within the last 5 years?</label>
                <select id="num_claims" v-model="num_claims" class="form-select form-select-lg">
                  <option selected="" value="0">No Claims</option>
                  <option value="1">1 Claim</option>
                  <option value="2">2 Claims</option>
                  <option value="3">3+ Claims</option>
                </select>
              </div>
            </div>

            <hr class="my-4" />
            <div class="custom-card my-4">
              <h6 class="fw-bold text-danger mb-2">
                <i class="fas fa-ban me-2"></i> Cancellations
              </h6>
              <div class="col-md-6">
                <label>How many cancellations have you had due to non-payment?</label>
                <select id="num_cancellations" v-model="num_cancellations" class="form-select form-select-lg">
                  <option value="0" selected="">No Cancellations</option>
                  <option value="1">1 Cancellation</option>
                  <option value="2">2 Cancellations</option>
                  <option value="3">3+ Cancellations</option>
                </select>
              </div>
            </div>
          </template>
          <template v-if="insurance_policy === 'Yes'">
            <div class="col-md-6"></div>

            <hr class="my-4" />
            <div class="custom-card my-4">
              <h6 class="fw-bold text-danger mb-2">
                <i class="fas fa-ban me-2"></i> Claims
              </h6>
              <div class="col-md-6">
                <label>Any claims within the last 5 years?</label>
                <select id="num_claims" v-model="num_claims" class="form-select form-select-lg">
                  <option selected="" value="0">No Claims</option>
                  <option value="1">1 Claim</option>
                  <option value="2">2 Claims</option>
                  <option value="3">3+ Claims</option>
                </select>
              </div>
            </div>

            <hr class="my-4" />
            <div class="custom-card my-4">
              <h6 class="fw-bold text-danger mb-2">
                <i class="fas fa-ban me-2"></i> Cancellations
              </h6>
              <div class="col-md-6">
                <label>How many cancellations have you had due to non-payment?</label>
                <select id="num_cancellations" v-model="num_cancellations" class="form-select form-select-lg">
                  <option value="0" selected="">No Cancellations</option>
                  <option value="1">1 Cancellation</option>
                  <option value="2">2 Cancellations</option>
                  <option value="3">3+ Cancellations</option>
                </select>
              </div>
            </div>
          </template>


          <div class="d-flex justify-content-between mt-5">
            <button type="button" class="btn btn-outline-dark px-4 py-2 rounded-pill" @click="$router.push('/')">
              Back
            </button>
            <button type="submit" class="btn btn-success px-4 py-2 rounded-pill">
              Continue
            </button>
          </div>

        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      dob_day: "",
      dob_month: "",
      dob_year: "",
      num_families: "",
      occupation_year: "",
      policy_star_date: "",
      current_policy: "",
      years_with_insurance: "",
      years_with_company: "",
      num_claims: "",
      num_cancellations: "",
      home_postal_code: "",
      home_location_index: "",
      home_location_city: "",
      errors: {},
    };
  },
  computed: {
    years() {
      const current = new Date().getFullYear();
      return Array.from({ length: 100 }, (_, i) => current - i);
    },
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.first_name) this.errors.first_name = "Please enter first name.";
      if (!this.last_name) this.errors.last_name = "Please enter last name.";
      if (!this.dob_year || !this.dob_month || !this.dob_day) {
        this.errors.dob = "Please select date of birth.";
      }
      if (!this.num_families) this.errors.num_families = "Please select occupancy.";
      if (!this.policy_star_date) this.errors.policy_star_date = "Please select policy start date.";

      return Object.keys(this.errors).length === 0;
    },

    async HomeApplication() {
      if (!this.validateForm()) {
        return;
      }

      const postalForm = JSON.parse(localStorage.getItem("postalsFormData")) || {};

      const payload = {
        first_name: this.first_name,
        last_name: this.last_name,
        dob: `${this.dob_year}-${String(this.dob_month).padStart(2, "0")}-${String(this.dob_day).padStart(2, "0")}`,
        num_families: this.num_families,
        occupation_year: this.occupation_year,
        policy_star_date: this.policy_star_date,
        current_policy: this.current_policy || "1",
        years_with_insurance: this.years_with_insurance,
        years_with_company: this.years_with_company,
        num_claims: this.num_claims,
        num_cancellations: this.num_cancellations,
        home_postal_code: postalForm.home_postal_code || "L6W1A2",
        home_location_index: postalForm.home_location_index || "2560",
        home_location_city: postalForm.home_location_city || "BRAMPTON",
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/home/home_application`, payload);
        this.$router.push("/home-quote/to/property");
      } catch (error) {
        console.error("Error submitting home application:", error.response?.data || error.message);
        alert("Error submitting form. Check required fields or try again later.");
      }
    },
  },
};
</script>
