<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import $ from "jquery";

// Images
import car from "/src/assets/images/auto.png";
import home from "/src/assets/images/home.png";
import business from "/src/assets/images/business.png";
import trucking from "/src/assets/images/trucking.png";
import travel from "/src/assets/images/travel.png";
import life from "/src/assets/images/life.png";
import mainrobo from "/src/assets/images/mainrobo.png";

const router = useRouter();

const activeSection = ref("auto");

const form = ref({
  addressComplete: "",
  matchedPostal: "",
  GCPCID: "",
  CITY: "",
  insurance_type: "",
});

const suggestions = ref([]);
const errorMessage = ref("");
const formatMessage = ref("");
const noPostalFound = ref(true);
const showSuggestions = ref(false);

const isGetQuoteDisabled = computed(() => {
  return noPostalFound.value || form.value.addressComplete.trim().length < 7;
});

const showQuote = (section) => {
  activeSection.value = section;
};

const onInputChange = async (e) => {
  let rawInput = e.target.value.toUpperCase().replace(/\s/g, "");
  rawInput = rawInput.replace(/[^A-Z0-9]/g, "");

  if (rawInput.length > 3) {
    form.value.addressComplete = rawInput.slice(0, 3) + " " + rawInput.slice(3, 6);
  } else {
    form.value.addressComplete = rawInput;
  }

  formatMessage.value = "";
  errorMessage.value = "";
  noPostalFound.value = true;

  if (rawInput.length < 6) {
    formatMessage.value = "Postal code must be in format L6W 1A2";
    return;
  }

  const formatted = form.value.addressComplete;
  const postalCodeRegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;

  if (!postalCodeRegex.test(formatted)) {
    formatMessage.value = "Please enter postal code (e.g. L6W 1A2)";
    return;
  }

  await checkPostalInDatabase(rawInput);
};

const checkPostalInDatabase = async (postalCode) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicle/postal_codes`, {
      params: { search: postalCode },
    });

    if (response.data.length > 0) {
      const item = response.data[0];
      form.value.matchedPostal = item.postal_code || "";
      form.value.GCPCID = item.GCPCID || "";
      form.value.CITY = item.CITY || "";
      noPostalFound.value = false;
      errorMessage.value = "";
    } else {
      form.value.matchedPostal = "";
      form.value.GCPCID = "";
      form.value.CITY = "";
      noPostalFound.value = true;
      errorMessage.value = "Postal code not found in our system.";
    }
  } catch (error) {
    console.error(error);
    noPostalFound.value = true;
    errorMessage.value = "Server error while verifying postal code.";
  }
};

const selectSuggestion = (item) => {
  form.value.addressComplete = item.postal_code;
  form.value.matchedPostal = item.postal_code;
  form.value.GCPCID = item.GCPCID || "";
  form.value.CITY = item.CITY || "";
  suggestions.value = [];
  showSuggestions.value = false;
  errorMessage.value = "";
 // formatMessage.value = `Using closest match: ${item.postal_code}`;
  noPostalFound.value = false;
};

const getQuote = () => {
  localStorage.setItem("postalFormData", JSON.stringify(form.value));
  router.push("/autoquote/to/vehicle");
};

const getHomeQuote = () => {
  localStorage.setItem("postalsFormData", JSON.stringify(form.value));
  switch (form.value.insurance_type) {
    case "H":
      router.push("/home-quote/to/address");
      break;
    case "C":
      router.push("/condo-quote/to/address");
      break;
    case "T":
      router.push("/tenant-quote/to/address");
      break;
    default:
      alert("Please select a valid insurance type.");
  }
};

onMounted(() => {
  $(".auto").addClass("active");
  $(".auto, .home, .business, .trucking, .life, .travel").on("click", function () {
    $(".auto, .home, .business, .trucking, .life, .travel").removeClass("active");
    $(this).addClass("active");
  });
});
</script>

<template>
  <div class="hero maxwidth">
    <div class="container-fluid">
      <div class="row align-items-center">

        <div class="col-lg-9 col-md-12 hero-text">
          <h2 class=" fw-bold">
            <span class=" green-text">Futuristic Way</span> to Buy<br />Insurance
            Made Simple
          </h2>
          <p class="subheading fs-4">Get Quick Quote</p>
 
          <div class="row justify-content-center g-3">

            <div class="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('auto')">
              <div class="auto category-box  rounded">
                <img :src="car" alt="Auto">
              </div>
              <p class="category-label">Auto</p>
            </div>

            <div class="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('home')">
              <div class="home category-box rounded">
                <img :src="home" alt="home">
              </div>
              <p class="category-label">Home</p>
            </div>

           <div class=" col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('business')">
              <div class="business category-box rounded">
                <img :src="business" alt="business">
              </div>
              <p class="category-label">Business</p>
            </div>

            <div class="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('trucking')">
              <div class="trucking category-box rounded">
                <img :src="trucking" alt="Trucking">
              </div>
              <p class="category-label">Trucking</p>
            </div>

            <div class="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('travel')">
              <div class="travel category-box rounded">
                <img :src="travel" alt="Travel">
              </div>
              <p class="category-label">Travel</p>
            </div>
            <div class="col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center" @click="showQuote('life')">
              <div class="life category-box rounded">
                <img :src="life" alt="Life">
              </div>
              <p class="category-label">Life</p>
            </div>

        </div>
        </div>


        <div class="col-lg-3 col-md-12 hero-image text-center mt-4 mt-lg-0 d-none d-lg-block">
          <img :src="mainrobo" alt="robot" class="img-fluid" />
        </div>

      </div>
    </div>
    <div v-if="activeSection === 'auto'"
      class="d-flex flex-column align-items-center justify-content-center position-relative"
      style="max-width: 500px; margin: auto;">
      <form @submit.prevent="getQuote">
        <div class="d-flex w-100 position-relative">
          <input type="text" class="form-control form-control-lg custom-postal-input shadow-sm px-4 me-2"
            v-model="form.addressComplete" @input="onInputChange" list="postal-list" autocomplete="off"
            placeholder="Enter Postal Code" />
          <input type="hidden" v-model="form.GCPCID" /><input type="hidden" v-model="form.CITY" />
          <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2" :disabled="isGetQuoteDisabled"><i
              class="fas fa-paper-plane me-2"></i><span class="d-none d-sm-inline">Get My Quote</span></button>
    <ul v-if="showSuggestions" class="search-result list-group position-absolute start-0 w-100 z-3">
          <li v-for="(item, index) in suggestions" :key="index" @click="selectSuggestion(item)"
              class="suggestion-item list-group-item">
              {{ item.postal_code }}
            </li>
          </ul>
        </div>


        <div v-if="formatMessage" class="mt-2 text-danger">{{ formatMessage }}</div>
        <div v-if="errorMessage" class="mt-2 text-danger">{{ errorMessage }}</div>
      </form>
    </div>


    <div class="d-flex align-items-center justify-content-center position-relative" style="margin: auto;"
      v-if="activeSection === 'home'">
      
      <form @submit.prevent="getHomeQuote">
        <div class="d-flex w-100 position-relative">
        <select
          class="form-control form-control-lg custom-postal-input shadow-sm px-4 me-2"
          v-model="form.insurance_type"  name="insurance_type"  aria-label="select insurance type">
          <option value="" disabled>Type of Insurance</option>
          <option value="H">Home Insurance</option>
          <option value="C">Condo Insurance</option>
          <option value="T">Tenant Insurance</option>
        </select>
      
        <input
          type="text"
          class="form-control form-control-lg custom-postal-input shadow-sm px-4 me-2"
          v-model="form.addressComplete"
          @input="onInputChange"   list="postal-list"     autocomplete="off"  placeholder="Enter Postal Code"/>

      
        <input type="hidden" v-model="form.GCPCID" />
        <input type="hidden" v-model="form.CITY" />
        <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2" :disabled="isGetQuoteDisabled" style="width:220px;"><i
          class="fas fa-paper-plane me-2"></i><span class="d-none d-sm-inline">Get My Quote</span></button>
     
        <ul v-if="showSuggestions" class="search-result list-group position-absolute start-0 w-100 z-3">

          <li v-for="(item, index) in suggestions" :key="index" @click="selectSuggestion(item)"
            class="suggestion-item list-group-item">
            {{ item.postal_code }}
          </li>
        </ul>
        </div>
     


      <div v-if="formatMessage" class="mt-2 text-danger">{{ formatMessage }}</div>
      <div v-if="errorMessage" class="mt-2 text-danger">{{ errorMessage }}</div>
      </form>
    </div>

    <div class="d-flex align-items-center justify-content-center position-relative" v-if="activeSection === 'travel'">
      <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2"><i class="fas fa-paper-plane me-2"></i><span
          class="d-none d-sm-inline">Get My Quote</span></button>
    </div>
    <div class="d-flex align-items-center justify-content-center position-relative" v-if="activeSection === 'trucking'">
      <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2"><i class="fas fa-paper-plane me-2"></i><span
          class="d-none d-sm-inline">Get My Quote</span></button>
    </div>
    <div class="d-flex align-items-center justify-content-center position-relative" v-if="activeSection === 'business'">
      <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2"><i class="fas fa-paper-plane me-2"></i><span
          class="d-none d-sm-inline">Get My Quote</span></button>
    </div>
    <div class="d-flex align-items-center justify-content-center position-relative" style="margin: auto;"
      v-if="activeSection === 'life'">

      <select class="form-control form-control-lg custom-postal-input shadow-sm px-4 me-2" name="province"
        aria-label="select province">
        <option value="" disabled="" selected="">Select Province</option>

        <option value="AB">Alberta</option>

        <option value="BC">British Columbia</option>

        <option value="NS">Nova Scotia</option>

        <option value="ON">Ontario</option>

        <option value="SK">Saskatchewan</option>

      </select>
      <input type="text" name="postal_code" class="form-control form-control-lg custom-postal-input shadow-sm px-4 me-2"
        placeholder="Enter Postal Code" />
      <button type="submit" class="btn custom-quote-btn fw-bold px-4 py-2"><i class="fas fa-paper-plane me-2"></i><span
          class="d-none d-sm-inline"><span class="d-none d-sm-inline">Get My Quote</span></span></button>
    </div>
  </div>

</template>
<style scoped>
.home.active,
.auto.active,
.business.active,
.travel.active,
.trucking.active,
.life.active {
  background-color: #047857 !important;
}
</style>
