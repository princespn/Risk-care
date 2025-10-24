<script setup>
import Sidebar from "./partial/Sidebar.vue";
import Loading from "./Loading.vue";
import { ref } from "vue";
const isLoading = ref(true);
</script>
<template>
  <div class="row min-vh-100">
    <div class="row">
      <Sidebar />
      <div class="col-12 col-md-10 p-3 p-md-5">
        <h3 class="fw-bold">We’ll make this fast and simple</h3>

        <div class="info-box">
          <p class="fw-bold mb-1">You’re seconds away from your personalized offers.</p>
          <ul class="mb-0">
            <li>See all of your quote. We've compared rates from 50+ leading Canadian insurance providers for you.</li>
            <li>Contact a licensed insurance professional to secure your rate and discuss how you could save even more.
            </li>
          </ul>
        </div>

        <div class="mb-4">
          <label><strong>1 -</strong> Get a 10-15% discount by bundling multiple policies (e.g. home, condo, tenant
            insurance) with the same company. Do you own or rent and want to bundle your policies?</label>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline-success" :class="{ active: form.home_owner_type === 'Homeowner' }"
              @click="form.home_owner_type = 'Homeowner'">Homeowner</button>
            <button class="btn btn-outline-success" :class="{ active: form.home_owner_type === 'Condo Owner' }"
              @click="form.home_owner_type = 'Condo Owner'">Condo Owner</button>
            <button class="btn btn-outline-success" :class="{ active: form.home_owner_type === 'Tenant' }"
              @click="form.home_owner_type = 'Tenant'">Tenant</button>
            <button class="btn btn-outline-success" :class="{ active: form.home_owner_type === 'No Discount' }"
              @click="form.home_owner_type = 'No Discount'">No, I don’t want this discount</button>
          </div>
        </div>

        <div class="mb-4">
          <label><strong>2 -</strong> Do you currently have a tenant insurance policy?</label>
          <div class="d-flex gap-3">
            <button class="btn btn-outline-success" :class="{ active: form.tenant_insurance === 'Yes' }"
              @click="form.tenant_insurance = 'Yes'">
              Yes
            </button>
            <button class="btn btn-outline-success" :class="{ active: form.tenant_insurance === 'No' }"
              @click="form.tenant_insurance = 'No'">
              No
            </button>
          </div>
          <div v-if="form.tenant_insurance === 'Yes'" class="alert alert-info mt-3">
            You will be asked to provide the name of your tenant insurance company and policy number when you speak with
            a broker.
          </div>
        </div>

        <div class="mb-4">
          <label><strong>3 -</strong> Save up to an additional 20%. Please indicate whether you are a member of
            CAA.</label>
          <select v-model="form.caa_member" class="form-select w-50">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div class="mb-4">
          <label><strong>4 -</strong> For a discount of up to 30%, please indicate whether you would install an app on
            your phone that scores your driving habits.</label>
          <select v-model="form.telematics_discount" class="form-select w-50">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div class="mb-4">
          <label><strong>5 -</strong>Save up to an additional 10% if you are a graduate or student of a Canadian
            university or college. What Canadian university or college did you graduate from/are you attending?</label>
          <input type="text" class="form-control w-50" @input="validate_discount" v-model="form.group_discount" placeholder="Discount">
                    <div v-if="errors.group_discount" class="error">{{ errors.group_discount }}</div>
        </div>

        <div class="mb-4">
          <label><strong>6 -</strong> Please provide your email address so we can send you a copy of your quotes</label>
          <input type="email" v-model="form.email" @input="validateEmail" class="form-control w-50"
            placeholder="Please enter email">
          <div v-if="errors.email" class="error">{{ errors.email }}</div>
        </div>

        <div class="mb-4">
          <label><strong>7 -</strong> Phone number</label>
          <input type="text" v-model="form.phone" @input="validatePhone" class="form-control w-50" maxlength="10"
            placeholder="Please enter phone number">
          <div v-if="errors.phone" class="error">{{ errors.phone }}</div>
        </div>

        <label class="small">
          To get my quote, I consent to INSURANCE and Rates Insurance Services disclosing my contact details for
          post-quote follow up, and agree to receive my quote information by email, SMS or phone call, and to keep me
          informed about offers such as Insurance renewal service and newsletters from INSURANCE and its family of
          companies as further described in the Privacy Policy. I may unsubscribe at any time.
        </label>
        <div class="form-check mb-4">
          <input class="form-check-input border border-primary" type="checkbox" id="consent" v-model="form.agree">
          <label class="form-check-label" for="consent">I agree</label>
        </div>

        <div class="d-flex justify-content-between mt-5 p-3">
          <button class="btn btn-outline-success px-4" @click="$router.push('/autoquote/to/driver')">Back</button>
          <button class="btn btn-success px-4" @click="submitForm">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
     form: {
        home_owner_type: 'Tenant',
        tenant_insurance: '',
        caa_member: '',
        telematics_discount: '',
        group_discount: '',
        email: '',
        phone: '',
        agree: false
      },
      errors: {}
    };
  },

  mounted() {
    this.loadFormFromStorage();
    this.submitVehicleLinks();
  },

  methods: {

    loadFormFromStorage() {
      const savedData = localStorage.getItem("discountFormData");
      if (!savedData) return;

      try {
        const parsed = JSON.parse(savedData);
        const isRecent = Date.now() - parsed.timestamp < 3 * 60 * 60 * 1000; // 3 hours

        if (isRecent) {
          this.form = parsed.data;
        } else {
          localStorage.removeItem("discountFormData");
        }
      } catch (e) {
        console.error("Failed to parse discount form data:", e);
        localStorage.removeItem("discountFormData");
      }
    },

      validate_discount() {
      if (!this.form.group_discount) {
        this.errors.group_discount = "Please enter discount is required.";
      } else {
        delete this.errors.group_discount;
      }
    },


    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        this.errors.email = "Please enter Email-id is required.";
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Please enter valid Email format.";
      } else {
        delete this.errors.email;
      }
    },



    validatePhone() {
      this.form.phone = this.form.phone.replace(/\D/g, '');
      if (!this.form.phone) {
        this.errors.phone = "Please enter Phone number is required.";
      } else if (this.form.phone.length !== 10) {
        this.errors.phone = "Phone must be exactly 10 digits.";
      } else {
        delete this.errors.phone;
      }
    },

    validateForm() {
      this.validateEmail();
      this.validatePhone();
      this.validate_discount();
      return Object.keys(this.errors).length === 0;
    },

    async submitForm() {
      if (!this.validateForm()) {
        console.warn("Form validation failed:", this.errors);
        return;
      }

      try {

         /*  await axios.post(`${import.meta.env.VITE_API_URL}/api/users/save_user`, {
          email: this.form.email,
          phone: this.form.phone
        });

      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/send-email`, {
          to: this.form.email,
          subject: this.subject,
          message: this.message,
        }); */

        await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/discountsave`, this.form);

        localStorage.setItem("discountFormData", JSON.stringify({
          data: this.form,
          timestamp: Date.now()
        }));

        this.$router.push("/autoquote/to/your-rate");
      } catch (error) {
        console.error("Form submission failed:", error);

      }
    },

   async submitVehicleLinks() {
      const rawVehicleIds = localStorage.getItem("vehicleIdsData");
      const rawDriverIds = localStorage.getItem("driverIdsData");

      if (!rawVehicleIds || !rawDriverIds) {
        console.warn("Missing vehicle or driver data in localStorage.");
        return;
      }

      let vehicleIds, driverIds;

      try {
        vehicleIds = JSON.parse(rawVehicleIds);
        driverIds = JSON.parse(rawDriverIds);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        return;
      }

      if (!Array.isArray(vehicleIds)) vehicleIds = [vehicleIds];
      if (!Array.isArray(driverIds)) driverIds = [driverIds];

      const links = [];

      for (let i = 0; i < Math.min(vehicleIds.length, driverIds.length); i++) {
        const vehicle = vehicleIds[i];
        const driver = driverIds[i];

        const vehicle_id = typeof vehicle === "object" ? vehicle.vehicleIds?.[0] : vehicle;
        const driver_id = typeof driver === "object" ? driver.driverIds?.[0] : driver;

        if (vehicle_id && driver_id) {
          links.push({ vehicle_id, driver_id });
        }
      }

      if (links.length === 0) {
        console.warn("No valid links to submit.");
        return;
      }



      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/links_vehicle`, {
          links
        });

        console.log("Vehicle-driver links submitted successfully:", response.data);
      } catch (err) {
        console.error("submit aaa error:", err.response?.data);
      }
    },
  }
};
</script>