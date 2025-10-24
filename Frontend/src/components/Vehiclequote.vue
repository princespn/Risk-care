<script setup>
import Sidebar from "./partial/Sidebar.vue";
import Loading from "./Loading.vue";
import { ref } from "vue";
const isLoading = ref(false);
</script>
<template>
  <div class="row min-vh-100">
    <Sidebar />
    <div class="col-md-10 p-5 tab">
      <h3 class="form-title">We’ll make this fast and simple</h3>

      <p class="form-subtitle">Fill your Vehicle Details</p>

      <ul class="nav nav-tabs d-flex" id="driverTabs">
        <li
          class="nav-item"
          v-for="(vehicle, index) in vehicles"
          :key="vehicle.id"
        >
          <a
            href="#"
            class="nav-link active"
            :class="{ active: activeTab === vehicle.id }"
            @click.prevent="activeTab = vehicle.id"
          >
            {{
              vehicle.vehicle_year && vehicle.vehicle_model
                ? `${vehicle.vehicle_year} ${vehicle.vehicle_model}`
                : `Vehicle #${index + 1}`
            }}</a
          >
          <button
            v-if="vehicles.length > 1"
            class="remove-btn"
            @click="removeVehicle(index)"
          >
            Remove
          </button>
        </li>
        <li class="ms-auto" id="addDriverButton">
          <button
            class="btn btn-success px-3 py-1 mb-1 rounded-pill"
            @click="addVehicle"
          >
            <i class="fas fa-plus me-2"></i>
            <span class="d-none d-sm-inline">New vichel</span>
          </button>
        </li>
      </ul>
      <form @submit.prevent="VehicleAction" class="p-1">
        <div
          v-for="(vehicle, index) in vehicles"
          :key="vehicle.id"
          v-show="activeTab === vehicle.id"
        >
          <div class="row g-4 container mt-4">
            <div class="col-md-6">
              <label>How many Vehicles do you have?</label>
              <select
                v-model="vehicle.vehicle_total"
                id="vehicle_total"
                class="form-control form-control-lg"
                aria-labelledby="ariavehicle-number"
              >
                <option value="">Select number of vehicle</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
              <span v-if="errors[vehicle.id]?.vehicle_total" class="error">
                {{ errors[vehicle.id].vehicle_total }}
              </span>
            </div>
            <div class="col-md-6">
              <label>How many drivers are in the House hold</label>
              <select
                v-model="vehicle.vehicle_driver_num"
                id="vehicle_driver_num"
                class="form-control form-control-lg"
                aria-labelledby="ariavehicle-number"
              >
                <option value="">Select number of driver.</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
              <span v-if="errors[vehicle.id]?.vehicle_driver_num" class="error">
                {{ errors[vehicle.id].vehicle_driver_num }}
              </span>
            </div>

            <div class="col-md-6">
              <label>Vehicle Year</label>
              <select
                v-model="vehicle.vehicle_year"
                @change="onYearChange(vehicle)"
                class="form-select form-select-lg"
              >
                <option value="">Select Year</option>
                <option
                  v-for="year in years"
                  :key="year"
                  :value="year"
                >
                  {{ year }}
                </option>
              </select>
              <span v-if="errors[vehicle.id]?.vehicle_year" class="error">
                {{ errors[vehicle.id].vehicle_year }}
              </span>
            </div>
            <div class="col-md-6">
              <label>Vehicle Make</label>
              <select
                v-model="vehicle.vehicle_make"
                class="form-select form-select-lg"
                @change="onMakeChange(vehicle)"
              >
                <option value="">Select Make</option>
                <option
                  v-for="make in vehicle.makes || []"
                  :key="make"
                  :value="make"
                >
                  {{ make }}
                </option>
              </select>
              <span v-if="errors[vehicle.id]?.vehicle_make" class="error">
                {{ errors[vehicle.id].vehicle_make }}
              </span>
            </div>

            <div class="col-md-6">
              <label>Vehicle Model</label>
              <input type="hidden" :value="vehicle.ext_vicc" name="ext_vicc" />
              <input
                type="hidden"
                :value="vehicle.vicc_code"
                name="vicc_code"
              />
              <input
              type="hidden"
              :value="vehicle.vin_number"
              name="vin_number"
            />

              <select
                class="form-select form-select-lg"
                v-model="vehicle.vehicle_model"
                @change="onModelSelect(vehicle)"
              >
                <option value="">Select Model</option>
                <option
                  v-for="model in vehicle.models || []"
                  :key="model.MODEL"
                  :value="model.MODEL"
                >
                  {{ model.MODEL }}
                </option>
              </select>
              <span v-if="errors[vehicle.id]?.vehicle_model" class="error">
                {{ errors[vehicle.id].vehicle_model }}
              </span>
            </div>
            <div class="col-md-6">
              <label>Is the vehicle financed or leased?</label>
              <select
                v-model="vehicle.is_leased"
                id="is_leased"
                class="form-select form-select-lg"
                aria-labelledby="ariaIsLeased"
              >
                <option value="">Select...</option>
                <option value="N">Financed</option>
                <option value="N">Leased</option>
                <option value="Y">
                  Owned - Paid in Cash / Completed Financing
                </option>
              </select>
              <span v-if="errors[vehicle.id]?.is_leased" class="error">
                {{ errors[vehicle.id].is_leased }}
              </span>
            </div>

            <div class="col-md-3">
              <label>Vehicle Purchase Month</label>
              <select
                v-model="vehicle.acquired_month"
                id="acquired-month0"
                class="form-select form-select-lg"
                aria-labelledby="ariaAquired0"
              >
                <option value="">Month</option>
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
              <span v-if="errors[vehicle.id]?.acquired_month" class="error">
                {{ errors[vehicle.id].acquired_month }}
              </span>
            </div>
            <div class="col-md-3">
              <label>Vehicle Purchase Year</label>
              <select
                v-model="vehicle.acquired_year"
                id="acquired-year0"
                class="form-select form-select-lg"
                aria-labelledby="ariaAquired0"
              >
                <option value="" selected="">Year</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
              </select>
              <span v-if="errors[vehicle.id]?.acquired_year" class="error">
                {{ errors[vehicle.id].acquired_year }}
              </span>
            </div>
            <div class="col-md-6">
              <label>What is the primary use of this vehicle? </label>
              <select
                v-model="vehicle.primary_use"
                class="form-select form-select-lg"
              >
                <option value="">Select...</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>
              <span v-if="errors[vehicle.id]?.primary_use" class="error">
                {{ errors[vehicle.id].primary_use }}
              </span>
            </div>
            <div class="col-md-6">
              <label>Where is this vehicle parked overnight? </label>
              <select
                v-model="vehicle.vehicle_parkLocation"
                class="form-select form-select-lg"
              >
                <option value="">Select...</option>
                <option value="garage">Private Garage</option>
                <option value="driveway">Private Driveway</option>
                <option value="underground">Underground Parking</option>
                <option value="lot">Parking Lot</option>
                <option value="carport">Carport</option>
                <option value="storage">Indoor Storage</option>
                <option value="street">Street</option>
                <option value="other">Other</option>
              </select>
              <span
                v-if="errors[vehicle.id]?.vehicle_parkLocation"
                class="error"
              >
                {{ errors[vehicle.id].vehicle_parkLocation }}
              </span>
            </div>
            <div class="col-md-6">
              <label
                >How many kilometers are driven to work or school one way (each
                day)?</label
              >
              <select
                v-model="vehicle.annual_distance_day"
                class="form-select form-select-lg"
                id="annual-distance"
              >
                <option value="">Select...</option>
                <option value="0">0 KM</option>
                <option value="2">2 KM</option>
                <option value="5">5 KM</option>
                <option value="7">7 KM</option>
                <option value="10">10 KM</option>
                <option value="15">15 KM</option>
                <option value="20">20 KM</option>
                <option value="30">30 KM</option>
                <option value="40">40 KM</option>
                <option value="50">50 KM</option>
                <option value="60">60 KM</option>
                <option value="70">70 KM</option>
                <option value="80">80 KM</option>
                <option value="90">90 KM</option>
                <option value="100">100 KM</option>
                <option value="150">150 KM</option>
                <option value="200">200 KM</option>
              </select>
              <span
                v-if="errors[vehicle.id]?.annual_distance_day"
                class="error"
              >
                {{ errors[vehicle.id].annual_distance_day }}
              </span>
            </div>

            <div class="col-md-6">
              <label> How many total kilometers are driven each year?</label>
              <select
                v-model="vehicle.annual_distance_year"
                class="form-select form-select-lg"
              >
                <option value="500">500 KM</option>
                <option value="1000">1,000 KM</option>
                <option value="2000">2,000 KM</option>
                <option value="3000">3,000 KM</option>
                <option value="4000">4,000 KM</option>
                <option value="5000">5,000 KM</option>
                <option value="6000">6,000 KM</option>
                <option value="7000">7,000 KM</option>
                <option value="8000">8,000 KM</option>
                <option value="9000">9,000 KM</option>
                <option value="10000">10,000 KM</option>
                <option value="15000">15,000 KM</option>
                <option value="20000">20,000 KM</option>
                <option value="30000">30,000 KM</option>
                <option value="50000">50,000 KM</option>
                <option value="60000">60,000 KM</option>
                <option value="80000">80,000 KM</option>
                <option value="100000">100,000 KM</option>
              </select>
              <label
                >(Based on your daily commute and the driving behavior of others
                in your areas, we’ve estimated your annual usage to be 10,000
                km)</label
              >
              <span
                v-if="errors[vehicle.id]?.annual_distance_year"
                class="error"
              >
                {{ errors[vehicle.id].annual_distance_year }}
              </span>
            </div>
            <hr class="my-4" />
            <strong
              >Would you like your insurance to include comprehensive and/or
              collision coverage? Removing one or both of these will make your
              quote cheaper.</strong
            >
            <div class="col-md-6">
              <label>Comprehensive Coverage</label>
              <select
                v-model="vehicle.comprehensive_coverage"
                class="form-select form-select-lg"
              >
                <option value="">Select...</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <span
                v-if="errors[vehicle.id]?.comprehensive_coverage"
                class="error"
              >
                {{ errors[vehicle.id].comprehensive_coverage }}
              </span>
            </div>
            <div class="col-md-6">
              <label>Collision Coverage</label>
              <select
                v-model="vehicle.collision_coverage"
                class="form-select form-select-lg"
              >
                <option value="">Select...</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <span v-if="errors[vehicle.id]?.collision_coverage" class="error">
                {{ errors[vehicle.id].collision_coverage }}
              </span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-5">
          <button
            type="button"
            class="btn btn-outline-dark px-4 py-2 rounded-pill"
          >
            Back
          </button>
          <button type="submit" class="btn btn-success px-4 py-2 rounded-pill">
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";

export default {
  data() {
    return {
      maxVehicles: 5,
      activeTab: "New_vehicle1",
      errors: {},
      isSubmitting: false,
      years: [],
      makes: [],
      models: [],
      selectedYear: "",
      selectedMake: "",
      selectedModel: "",
      vehicles: [
        {
          id: "New_vehicle1",
          parkLocation: "garage",
          antiTheftDevice: "No",
          vehicle_total: "",
          vehicle_driver_num: "",
          vehicle_year: "",
          vehicle_model: "",
          vehicle_make: "",
          ext_vicc: "",
          vin_number:"",
          vicc_code: "",
          is_leased: "",
          primary_use: "",
          annual_distance_day: "",
          vehicle_parkLocation: "",
          annual_distance_year: "",
          acquired_month: "",
          acquired_year: "",
          collision_coverage: "",
          comprehensive_coverage: "",
        },
      ],
    };
  },

  mounted() {
  if (typeof window !== "undefined") {
    this.loadVehicles();
    this.fetchYears();
  }
},


  methods: {
    async onModelSelect(vehicle) {
      const selectedModelData = (vehicle.models || []).find(
        (m) => m.MODEL === vehicle.vehicle_model
      );
      if (selectedModelData) {
        vehicle.ext_vicc = selectedModelData.EXT_VICC || "";
        vehicle.vicc_code = selectedModelData.VICC_CODE || "";
        vehicle.vin_number = selectedModelData.vin || "";
      } else {
        vehicle.ext_vicc = "";
        vehicle.vicc_code = "";
        vehicle.vin_number = "";
      }
    },
    async onYearChange(vehicle) {
      vehicle.vehicle_make = "";
      vehicle.vehicle_model = "";
      vehicle.makes = [];
      vehicle.models = [];

      if (vehicle.vehicle_year) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/vehicle/vehicles_makes`,
            {
              params: { year: vehicle.vehicle_year },
            }
          );
          vehicle.makes = response.data.makes;
        } catch (error) {
          console.error("Error fetching makes:", error);
        }
      }
    },

    async onMakeChange(vehicle) {
      vehicle.vehicle_model = "";
      vehicle.models = [];

      if (vehicle.vehicle_year && vehicle.vehicle_make) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/vehicle/vehicles_models`,
            {
              params: {
                year: vehicle.vehicle_year,
                make: vehicle.vehicle_make,
              },
            }
          );
          vehicle.models = response.data.models;
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      }
    },

    validateVehicles() {
      let valid = true;
      this.errors = {};

      this.vehicles.forEach((vehicle, vIndex) => {
        const vehicleErrors = {};

        if (!vehicle.vehicle_total)
          vehicleErrors.vehicle_total = "Please select Vehicle total.";
        if (!vehicle.vehicle_driver_num)
          vehicleErrors.vehicle_driver_num = "Please select Driver number.";
        if (!vehicle.vehicle_year)
          vehicleErrors.vehicle_year = "Please select Year.";
        if (!vehicle.vehicle_model)
          vehicleErrors.vehicle_model = "Please select Model.";
        if (!vehicle.vehicle_make)
          vehicleErrors.vehicle_make = "Please select Make.";
        if (!vehicle.primary_use)
          vehicleErrors.primary_use = "Please select Primary use.";
        if (!vehicle.annual_distance_day)
          vehicleErrors.annual_distance_day =
            "Please select Daily distance number of Kms.";
        if (!vehicle.annual_distance_year)
          vehicleErrors.annual_distance_year =
            "Please select Annual distance number of Kms.";
        if (!vehicle.acquired_month)
          vehicleErrors.acquired_month = "Please select Purchase month.";
        if (!vehicle.acquired_year)
          vehicleErrors.acquired_year = "Please select Purchase year.";
        if (!vehicle.is_leased)
          vehicleErrors.is_leased = "Please select financed or leased.";
        if (!vehicle.comprehensive_coverage)
          vehicleErrors.comprehensive_coverage =
            "Please select Comprehensive coverage.";
        if (!vehicle.vehicle_parkLocation)
          vehicleErrors.vehicle_parkLocation =
            "Please select parked overnight.";
        if (!vehicle.collision_coverage)
          vehicleErrors.collision_coverage =
            "Please select Collision coverage.";
        if (!vehicle.comprehensive_coverage)
          vehicleErrors.comprehensive_coverage =
            "Please select Comprehensive coverage.";

        if (Object.keys(vehicleErrors).length > 0) {
          this.errors[vehicle.id] = vehicleErrors;
          valid = false;
        }
      });

      return valid;
    },

    createBlankVehicle() {
      return {
        id: "New_vehicle1",
        parkLocation: "garage",
        antiTheftDevice: "No",
        vehicle_total: "",
        vehicle_driver_num: "",
        vehicle_year: "",
        vehicle_model: "",
        vehicle_make: "",
        ext_vicc: "",
        vicc_code: "",
        vin_number: "",
        is_leased: "",
        primary_use: "",
        annual_distance_day: "",
        vehicle_parkLocation: "",
        annual_distance_year: "",
        acquired_month: "",
        acquired_year: "",
        collision_coverage: "",
        comprehensive_coverage: "",
      };
    },

    async fetchYears() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/vehicle/vehicles_years`
        );
        this.years = response.data.years;
      } catch (error) {
        console.error("Error fetching model years:", error);
      }
    },

    async loadVehicles() {
      const rawData = localStorage.getItem("vehicleIdsData");
      alert(rawData);
      let vehicleIds = [];

      if (rawData) {
        try {
          const parsed = JSON.parse(rawData);
          const storedTime = parsed.timestamp;
          const now = Date.now();

          if (now - storedTime > 3 * 60 * 60 * 1000) {
            localStorage.removeItem("vehicleIdsData");
            this.vehicles = [this.createBlankVehicle()];
            this.activeTab = "New_vehicle1";
            this.$router.push({ path: "/" });
            return;
          }

          vehicleIds = parsed.vehicleIds || [];
        } catch (e) {
          console.error("Error parsing vehicleIdsData:", e);
          localStorage.removeItem("vehicleIdsData");
          vehicleIds = [];
        }
      }
      

      if (vehicleIds.length > 0) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/vehicle/get_vehicles`,
            { vehicleIds }
          );
          const loadedVehicles = response.data.vehicles;

          if (loadedVehicles.length > 0) {
            this.vehicles = [];

            for (let i = 0; i < loadedVehicles.length; i++) {
              const v = loadedVehicles[i];

              const vehicle = {
                id: v.id || `New_vehicle${i + 1}`,
                parkLocation: v.parkLocation || "garage",
                antiTheftDevice: v.antiTheftDevice || "No",
                vehicle_total: v.vehicle_total || "",
                vehicle_driver_num: v.vehicle_driver_num || "",
                vehicle_year: v.vehicle_year || "",
                vehicle_model: v.vehicle_model || "",
                vehicle_make: v.vehicle_make || "",
                ext_vicc: v.ext_vicc || "",
                vicc_code: v.vicc_code || "",
                vin_number: v.vin_number || "",
                is_leased: v.is_leased || "",
                primary_use: v.primary_use || "",
                annual_distance_day: v.annual_distance_day || "",
                vehicle_parkLocation: v.vehicle_parkLocation || "",
                annual_distance_year: v.annual_distance_year || "",
                acquired_month: v.acquired_month || "",
                acquired_year: v.acquired_year || "",
                collision_coverage: v.collision_coverage || "",
                comprehensive_coverage: v.comprehensive_coverage || "",
                makes: [],
                models: [],
              };

              if (vehicle.vehicle_year) {
                const makeRes = await axios.get(
                  `${import.meta.env.VITE_API_URL}/api/vehicle/vehicles_makes`,
                  {
                    params: { year: vehicle.vehicle_year },
                  }
                );
                vehicle.makes = makeRes.data.makes || [];
              }

              if (vehicle.vehicle_year && vehicle.vehicle_make) {
                const modelRes = await axios.get(
                  `${import.meta.env.VITE_API_URL}/api/vehicle/vehicles_models`,
                  {
                    params: {
                      year: vehicle.vehicle_year,
                      make: vehicle.vehicle_make,
                    },
                  }
                );
                vehicle.models = modelRes.data.models || [];
              }

              this.onModelSelect(vehicle);

              this.vehicles.push(vehicle);
            }

            this.activeTab = this.vehicles[0]?.id || "New_vehicle1";
          } else {
            this.vehicles = [this.createBlankVehicle()];
            this.activeTab = "New_vehicle1";
          }
        } catch (error) {
          console.error("Error fetching vehicles:", error);
          this.vehicles = [this.createBlankVehicle()];
          this.activeTab = "New_vehicle1";
        }
      } else {
        this.vehicles = [this.createBlankVehicle()];
        this.activeTab = "New_vehicle1";
      }
    },

    addVehicle() {
      if (this.vehicles.length >= this.maxVehicles) {
        alert(`Maximum ${this.maxVehicles} vehicles allowed!`);
        return;
      }

      const newVehicleId = `New_vehicle${this.vehicles.length + 1}`;
      const newVehicle = this.createBlankVehicle();
      newVehicle.id = newVehicleId;

      this.vehicles.push(newVehicle);
      this.activeTab = newVehicleId;
    },

    removeVehicle(index) {
      if (this.vehicles.length === 1) {
        alert("At least one vechicle is required.");
        return;
      }
      this.vehicles.splice(index, 1);
      this.activeTab = this.vehicles[0].id;
    },

    async VehicleAction() {
      this.isSubmitting = true;
      this.errors = {};

      if (!this.validateVehicles()) {
        this.isSubmitting = false;
        return;
      }

      try {
        const postalForm =
          JSON.parse(localStorage.getItem("postalFormData")) || {};

        const vehiclesPayload = this.vehicles.map((vehicle) => ({
          id: vehicle.id,
          vehicle_total: vehicle.vehicle_total,
          vehicle_driver_num: vehicle.vehicle_driver_num,
          vehicle_year: vehicle.vehicle_year,
          vehicle_model: vehicle.vehicle_model,
          vehicle_make: vehicle.vehicle_make,
          ext_vicc: vehicle.ext_vicc,
          vicc_code: vehicle.vicc_code,
          vin_number:vehicle.vin_number,
          is_leased: vehicle.is_leased,
          primary_use: vehicle.primary_use,
          annual_distance_day: vehicle.annual_distance_day,
          vehicle_parkLocation: vehicle.vehicle_parkLocation,
          annual_distance_year: vehicle.annual_distance_year,
          acquired_month: vehicle.acquired_month,
          acquired_year: vehicle.acquired_year,
          collision_coverage: vehicle.collision_coverage,
          comprehensive_coverage: vehicle.comprehensive_coverage,
          vehicle_location: postalForm.addressComplete || "",
          vehicle_location_index: postalForm.GCPCID || "",
          vehicle_location_city: postalForm.CITY || "",
        }));

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/vehicle/vehiclesave`,
          vehiclesPayload
        );
        const vehicleIds = response.data.vehicleIds || response.data.ids || [];

        const saveData = {
          vehicleIds: vehicleIds,
          timestamp: Date.now(),
        };

       // localStorage.setItem("vehicleIdsData", JSON.stringify(saveData));

       try {
      localStorage.setItem("vehicleIdsData", JSON.stringify(saveData));
      console.log("Vehicles saved in localStorage:", saveData);
    } catch (e) {
      console.error("localStorage error:", e);
    }

        alert("Vehicles saved successfully!");
        this.$router.push({ path: "/autoquote/to/driver" });
      } catch (error) {
        this.isSubmitting = false;
        this.errors =
          error.response?.data?.errors || error.response?.data?.error || {};
        console.error("Error saving vehicles:", error);
      }
    },
  },
};
</script>

<style scoped>
.nav-item {
  display: flex;
}

.remove-btn {
  background: transparent;
  outline: none;
  border: none;
  margin-right: 1rem;
}
</style>
