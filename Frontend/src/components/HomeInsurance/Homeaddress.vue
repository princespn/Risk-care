<script setup>
import Homesidebar from './Homesidebar.vue';
</script>
<template>
  <div class="row min-vh-100">
    <Homesidebar />
    <div class="col-md-10 p-5 tab">
        <h3 class="form-title">Good news —</h3>
      <p class="form-subtitle"> this will only take 3 minutes to complete and we'll compare quotes from 50+ of Canada's leading providers for you. </p>

      <form @submit.prevent="HomeAction" class="border border-2 p-1">
        <div class="row g-4 container mt-4">Home Address</div>
       <div class="col-md-6">
        <label>Please start typing in your address starting with postal code in the following format: A1A1A1 123 Streetname Rd</label>
        
          <input type="text" v-model="form.full_address" class="form-control" placeholder="Please type in Street address." />
      </div>

      <div class="d-flex justify-content-between mt-5">
        <button type="button" class="btn btn-outline-dark px-4 py-2 rounded-pill"
            @click="$router.push('/')">Back</button>
        <button type="submit" class="btn btn-success px-4 py-2 rounded-pill">Continue</button>
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
      form: {
        full_address: '',
        
      },
     
    };
  },

  computed: {
   
  },

  methods: {
  
    HomeAction() {      
      this.$router.push("/home-quote/to/applicantion");
    },

  },
};
  
</script>