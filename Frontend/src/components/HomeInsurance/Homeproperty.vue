<script setup>
import Homesidebar from './Homesidebar.vue';
</script>

<template>
  <div class="row min-vh-100">
    <Homesidebar />
    <div class="col-md-10 p-5 tab">    

      <form @submit.prevent="PropertyApplication" class="border border-2 p-1">
        <div class="row g-4 container mt-4">
          <p>
            We have gathered and pre-filled the information below about your property 
            to simplify the quote process. Please review to make sure it is accurate and 
            provide any missing details. 
          </p>
          <hr class="my-4" />

      
          <div class="col-md-6">
            <label>What year was your property built?</label>
            <input type="text" v-model="year_built" class="form-control" placeholder="Year built" />
            <small v-if="errors.year_built" class="text-danger">{{ errors.year_built }}</small>
          </div>

         
          <div class="col-md-6">
            <label>Total living area (sq ft)</label>
            <input type="text" v-model="square_footage" class="form-control" placeholder="Square footage" />
            <small v-if="errors.square_footage" class="text-danger">{{ errors.square_footage }}</small>
          </div>

       
          <div class="col-md-6">
            <label>Exterior finish</label>
            <select v-model="exterior_wall_type" class="form-select">
              <option value="">Select</option>
              <option value="brick">Brick</option>
              <option value="vinyl">Vinyl Siding</option>
              <option value="wood">Wood Siding</option>
              <option value="stone">Stone</option>
              <option value="stucco">Stucco</option>
            </select>
            <small v-if="errors.exterior_wall_type" class="text-danger">{{ errors.exterior_wall_type }}</small>
          </div>

          <div class="col-md-6">
            <label>Construction type</label>
            <select v-model="construction_type" class="form-select">
              <option value="">Select</option>
              <option value="wood">Wood Frame</option>
              <option value="masonry">Masonry</option>
              <option value="brick">Brick</option>
              <option value="fire Resist">Fire Resistive</option>
            </select>
            <small v-if="errors.construction_type" class="text-danger">{{ errors.construction_type }}</small>
          </div>

    
          <div class="col-md-6">
            <label>Garage type</label>
            <select v-model="garage_type" class="form-select">
              <option value="">Select</option>
              <option value="attached">Attached Garage</option>
              <option value="builtin">Built-in Garage</option>
              <option value="none">None</option>
            </select>
            <small v-if="errors.garage_type" class="text-danger">{{ errors.garage_type }}</small>
          </div>

        
          <div class="col-md-6">
            <label>Finished basement (%)</label>
            <select v-model="finished_basement" class="form-select">
              <option value="">Select</option>
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </select>
            <small v-if="errors.finished_basement" class="text-danger">{{ errors.finished_basement }}</small>
          </div>

                 <div class="col-md-6">
            <label>Number of storeys</label>
            <select v-model="storey_count" class="form-select">
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <small v-if="errors.storey_count" class="text-danger">{{ errors.storey_count }}</small>
          </div>

  
          <div class="col-md-6">
            <label>Year roof replaced</label>
            <select v-model="roof_year" class="form-select">
              <option value="">Select</option>
              <option v-for="y in roofYears" :key="y" :value="y">{{ y }}</option>
            </select>
            <small v-if="errors.roof_year" class="text-danger">{{ errors.roof_year }}</small>
          </div>

         
          <div class="col-md-6">
            <label>Nearest fire hall</label>
            <select v-model="firehall_distance" class="form-select">
              <option value="">Select</option>
              <option value="5">Within 5km</option>
              <option value="8">Within 8km</option>
              <option value="13">Within 13km</option>
            </select>
            <small v-if="errors.firehall_distance" class="text-danger">{{ errors.firehall_distance }}</small>
          </div>

        
          <div class="col-md-6">
            <label>Nearest fire hydrant</label>
            <select v-model="hydrants_distance" class="form-select">
              <option value="">Select</option>
              <option value="150">Within 150m</option>
              <option value="300">Within 300m</option>
              <option value="301">Over 300m</option>
            </select>
            <small v-if="errors.hydrants_distance" class="text-danger">{{ errors.hydrants_distance }}</small>
          </div>

     
          <div class="col-md-6">
            <label>Primary heating</label>
            <select v-model="primary_heating_type" class="form-select">
              <option value="">Select</option>
              <option value="natural gas">Natural Gas</option>
              <option value="electric">Electric</option>
              <option value="oil">Oil</option>
              <option value="wood">Wood</option>
            </select>
            <small v-if="errors.primary_heating_type" class="text-danger">{{ errors.primary_heating_type }}</small>
          </div>

          <div class="col-md-6">
            <label>Secondary heating</label>
            <select v-model="aux_heating_type" class="form-select">
              <option value="">Select</option>
              <option value="electric">Electric</option>
              <option value="fireplace">Fireplace</option>
              <option value="none">None</option>
            </select>
            <small v-if="errors.aux_heating_type" class="text-danger">{{ errors.aux_heating_type }}</small>
          </div>

            <div class="col-md-6">
            <label>Building style</label>
            <select v-model="architectural_style" class="form-select">
              <option value="">Select</option>
              <option value="detached">Detached</option>
              <option value="semi detached">Semi-Detached</option>
              <option value="duplex">Duplex</option>
            </select>
            <small v-if="errors.architectural_style" class="text-danger">{{ errors.architectural_style }}</small>
          </div>
          
          <div class="d-flex justify-content-between mt-5">
            <button type="button" class="btn btn-outline-dark px-4 py-2 rounded-pill" @click="$router.push('/')">Back</button>
            <button type="submit" class="btn btn-success px-4 py-2 rounded-pill" :disabled="isSubmitting">Continue</button>
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
      isSubmitting: false,
      year_built: "",
      square_footage: "",
      exterior_wall_type: "",
      construction_type: "",
      garage_type: "",
      finished_basement: "",
      storey_count: "",
      roof_year: "",
      firehall_distance: "",
      hydrants_distance: "",
      primary_heating_type: "",
      aux_heating_type: "",
      architectural_style: "",
      errors: {},
    };
  },
  computed: {
    roofYears() {
      const current = new Date().getFullYear();
      return Array.from({ length: 50 }, (_, i) => current - i);
    },
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.year_built) this.errors.year_built = "Please enter built year.";
      if (!this.square_footage) this.errors.square_footage = "Please enter square footage.";
      if (!this.exterior_wall_type) this.errors.exterior_wall_type = "Please select  exterior finish.";
      if (!this.construction_type) this.errors.construction_type = "Please select construction type is required.";
      if (!this.garage_type) this.errors.garage_type = "Please enter Garage type.";
      if (!this.finished_basement) this.errors.finished_basement = "Please select Basement info.";
      if (!this.storey_count) this.errors.storey_count = "Please select Storey count.";
      if (!this.roof_year) this.errors.roof_year = "Please select Roof year.";
      if (!this.firehall_distance) this.errors.firehall_distance = "Please select Fire hall distance.";
      if (!this.hydrants_distance) this.errors.hydrants_distance = "Please select Hydrant distance.";
      if (!this.primary_heating_type) this.errors.primary_heating_type = "Please select Primary heating type.";
      if (!this.aux_heating_type) this.errors.aux_heating_type = "Please select Secondary heating type.";
      if (!this.architectural_style) this.errors.architectural_style = "Please select Building style.";
      return Object.keys(this.errors).length === 0;
    },

    async PropertyApplication() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;
      const payload = {
        year_built: this.year_built,
        square_footage: this.square_footage,
        exterior_wall_type: this.exterior_wall_type,
        construction_type: this.construction_type,
        garage_type: this.garage_type,
        finished_basement: this.finished_basement,
        storey_count: this.storey_count,
        roof_year: this.roof_year,
        firehall_distance: this.firehall_distance,
        hydrants_distance: this.hydrants_distance,
        primary_heating_type: this.primary_heating_type,
        aux_heating_type: this.aux_heating_type,
        architectural_style: this.architectural_style,
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/home/property_application`, payload);
        this.$router.push("/home-quote/to/discounts");
      } catch (error) {
        console.error("Error submitting property application:", error);
        alert("Submission failed. Please try again later.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
