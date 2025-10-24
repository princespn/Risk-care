<script setup>
import Homesidebar from './Homesidebar.vue';
</script>
<template>
  <div class="row min-vh-100">
    <Homesidebar />
    <div class="col-md-10 p-5 tab">    
      <form @submit.prevent="DiscountApplication" class="border border-2 p-1">
        <div class="row g-4 container mt-4">
          <h3 class="form-title">You're seconds away from your personalized offers.</h3>
          <p>On the next page you'll be able to:</p>
          <ul>
            <li>See all of your quotes. We'll compare rates from 50+ leading Canadian insurance providers for you.</li>
            <li>Contact a licensed insurance professional to secure your rate and discuss how you could save even more.</li>
          </ul>
          <hr class="my-4" />

          <div class="col-md-10">
            <h5>Select the discounts you would like to include</h5>
          </div>

         
          <div class="col-md-6">
            <label>Save up to 18% more. Are you open to bundling multiple policies (e.g. auto) with the same company?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="bundling_policy === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="bundling_policy = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="bundling_policy === 'No' ? 'btn-success' : 'btn-outline-success'" @click="bundling_policy = 'No'">No</button>
            </div>
            <small v-if="errors.bundling_policy" class="text-danger">{{ errors.bundling_policy }}</small>
          </div>

         
          <div class="col-md-6">
            <label>Does your property have a monitored burglar alarm?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="has_burglar_alarm === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="has_burglar_alarm = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="has_burglar_alarm === 'No' ? 'btn-success' : 'btn-outline-success'" @click="has_burglar_alarm = 'No'">No</button>
            </div>
            <small v-if="errors.has_burglar_alarm" class="text-danger">{{ errors.has_burglar_alarm }}</small>
          </div>

      
          <div class="col-md-6">
            <label>Does your property have a monitored fire alarm?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="has_fire_alarm === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="has_fire_alarm = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="has_fire_alarm === 'No' ? 'btn-success' : 'btn-outline-success'" @click="has_fire_alarm = 'No'">No</button>
            </div>
            <small v-if="errors.has_fire_alarm" class="text-danger">{{ errors.has_fire_alarm }}</small>
          </div>

        
          <div class="col-md-6">
            <label>Does your property have a sprinkler system?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="has_sprinkler_system === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="has_sprinkler_system = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="has_sprinkler_system === 'No' ? 'btn-success' : 'btn-outline-success'" @click="has_sprinkler_system = 'No'">No</button>
            </div>
            <small v-if="errors.has_sprinkler_system" class="text-danger">{{ errors.has_sprinkler_system }}</small>
          </div>

 
          <div class="col-md-6">
            <label>Does your property have deadbolt locks on all entrances?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="has_deadbolt_locks === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="has_deadbolt_locks = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="has_deadbolt_locks === 'No' ? 'btn-success' : 'btn-outline-success'" @click="has_deadbolt_locks = 'No'">No</button>
            </div>
            <small v-if="errors.has_deadbolt_locks" class="text-danger">{{ errors.has_deadbolt_locks }}</small>
          </div>

          <div class="col-md-6">
            <label>Are the occupants non-smokers?</label>
            <div class="d-flex gap-3">
              <button type="button" class="btn me-2" :class="occupants_are_nonsmokers === 'Yes' ? 'btn-success' : 'btn-outline-success'" @click="occupants_are_nonsmokers = 'Yes'">Yes</button>
              <button type="button" class="btn" :class="occupants_are_nonsmokers === 'No' ? 'btn-success' : 'btn-outline-success'" @click="occupants_are_nonsmokers = 'No'">No</button>
            </div>
            <small v-if="errors.occupants_are_nonsmokers" class="text-danger">{{ errors.occupants_are_nonsmokers }}</small>
          </div>

      
          <div class="col-md-6">
            <label>Number of fire extinguishers</label>
            <select id="num_fire_extinguishers" v-model="num_fire_extinguishers" class="form-select">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

     
          <div class="col-md-6">
            <label>How many mortgages do you have on the property?</label>
            <select id="num_mortgages" v-model="num_mortgages" class="form-select">
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

      
          <div class="col-md-10">
            <label>Email</label>
            <input type="email" v-model="email_address" class="form-control" placeholder="Please type email address." />
            <small v-if="errors.email_address" class="text-danger">{{ errors.email_address }}</small>
          </div>

    
          <div class="col-md-10">
            <label>Phone number</label>
            <input type="number" v-model="phone_number" class="form-control" placeholder="Please type phone number." />
            <small v-if="errors.phone_number" class="text-danger">{{ errors.phone_number }}</small>
          </div>

   
          <p class="small">
            To get my quote, I consent to INSURANCE and Rates Insurance Services disclosing my contact details for post-quote follow up, and agree to receive my quote information by email, SMS or phone call, and to keep me informed about offers such as Insurance renewal service and newsletters from INSURANCE and its family of companies as further described in the Privacy Policy. I may unsubscribe at any time.
          </p>
          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" id="consent" v-model="agree">
            <label class="form-check-label" for="consent">I agree</label>
          </div>
          <small v-if="errors.agree" class="text-danger">{{ errors.agree }}</small>

       
          <div class="d-flex justify-content-between mt-5">
            <button type="button" class="btn btn-outline-dark px-4 py-2 rounded-pill" @click="$router.push('/')">Back</button>
            <button type="submit" class="btn btn-success px-4 py-2 rounded-pill" :disabled="isSubmitting">Get Free Quotes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSubmitting: false,
      errors: {},

      bundling_policy: '',
      has_burglar_alarm: '',
      has_fire_alarm: '',
      has_sprinkler_system: '',
      has_deadbolt_locks: '',
      occupants_are_nonsmokers: '',
      num_fire_extinguishers: '0',
      num_mortgages: '1',
      email_address: '',
      phone_number: '',
      agree: false,
    };
  },

  methods: {
    validateForm() {
      this.errors = {};

      if (!this.bundling_policy) this.errors.bundling_policy = "Please select an option for bundling policy.";
      if (!this.has_burglar_alarm) this.errors.has_burglar_alarm = "Please select an option for burglar alarm.";
      if (!this.has_fire_alarm) this.errors.has_fire_alarm = "Please select an option for fire alarm.";
      if (!this.has_sprinkler_system) this.errors.has_sprinkler_system = "Please select an option for sprinkler system.";
      if (!this.has_deadbolt_locks) this.errors.has_deadbolt_locks = "Please select an option for deadbolt locks.";
      if (!this.occupants_are_nonsmokers) this.errors.occupants_are_nonsmokers = "Please select an option for non-smokers.";

      if (!this.email_address) {
        this.errors.email_address = "Please enter a email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email_address)) {
        this.errors.email_address = "Please enter a valid email address.";
      }

      if (!this.phone_number) {
        this.errors.phone_number = "Please enter a valid phone number.";
      } else if (!/^\d{10}$/.test(this.phone_number)) {
        this.errors.phone_number = "Phone number must be 10 digits.";
      }

      if (!this.agree) {
        this.errors.agree = "Please you must agree before continuing.";
      }

      return Object.keys(this.errors).length === 0;
    },

    async DiscountApplication() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      const payload = {
        bundling_policy: this.bundling_policy,
        has_burglar_alarm: this.has_burglar_alarm,
        has_fire_alarm: this.has_fire_alarm,
        has_sprinkler_system: this.has_sprinkler_system,
        has_deadbolt_locks: this.has_deadbolt_locks,
        occupants_are_nonsmokers: this.occupants_are_nonsmokers,
        num_fire_extinguishers: this.num_fire_extinguishers,
        num_mortgages: this.num_mortgages,
        email_address: this.email_address,
        phone_number: this.phone_number,
        agree: this.agree,
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/home/discount_application`, payload);
        this.$router.push('/home-quote/complete');
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>