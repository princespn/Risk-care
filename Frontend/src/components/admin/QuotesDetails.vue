<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import LeftMenue from "./LeftMenue.vue";
import { useRouter } from "vue-router";
import html2pdf from "html2pdf.js";

const router = useRouter();

const goToQuoteDetails = (id) => {
  router.push({ name: "quotes_details", params: { id } }); 
};

const quotes = ref([]);
const currentPage = ref(1);
const perPage = ref(5); 

const totalQuotes = computed(() => quotes.value.length);
const totalPages = computed(() => Math.ceil(totalQuotes.value / perPage.value));

const paginatedQuotes = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return quotes.value.slice(start, end);
});

const showingFrom = computed(() =>
  totalQuotes.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1
);
const showingTo = computed(() =>
  Math.min(currentPage.value * perPage.value, totalQuotes.value)
);

const getCarrierDisplayName = (code) => {
  const names = {
    GA: "Aviva",
    HAL: "Intact Insurance",
    WAWA: "Wawanesa Mutual",
    GA2: "Aviva II",
    SGI: "SG Canada",
    ECON: "Economical",
    TRG: "Travelers",
    COA: "Coachman",
    DOC: "Desjardins",
    FAC: "Facility",
  };
  return names[code] || code;
};

const fetchUser_quotes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/get_quotes`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    quotes.value = response.data;
  } catch (error) {
    console.error("Error fetching user quotes:", error.response?.data || error.message);
  }
};

const downloadPDF = (quote) => {
  const element = document.createElement("div");
  element.innerHTML = `
    <h2 style="text-align:center; margin-bottom:10px;">Quote Details</h2>
    <table border="1" cellspacing="0" cellpadding="8" 
      style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
      <tr><th align="left">Quote ID</th><td>${quote.quote_guid}</td></tr>
      <tr><th align="left">Customer</th><td>
        ${(quote.full_name || "N/A")}<br/>${(quote.user_id || "N/A")}
      </td></tr>
      <tr><th align="left">Vehicle</th><td>
        ${
          quote.vehicles && quote.vehicles.length 
          ? `${quote.vehicles[0].Year} ${quote.vehicles[0].Manufacturer}<br/>VIN: ${quote.vehicles[0].ID}` 
          : "No Vehicle"
        }
      </td></tr>
      <tr><th align="left">Provider</th><td>${getCarrierDisplayName(quote.carrier_code)}</td></tr>
      <tr><th align="left">Premium</th><td>
        ${
          quote.vehicles && quote.vehicles.length 
          ? `$${quote.vehicles[0].VehicleTotal?.PremiumWithDecimal}/yr<br/>$${(quote.vehicles[0].VehicleTotal?.PremiumWithDecimal / 12).toFixed(2)}/mo` 
          : "-"
        }
      </td></tr>
      <tr><th align="left">Status</th><td>${quote.status === 1 ? "Active" : "Inactive"}</td></tr>
      <tr><th align="left">Date</th><td>${formatDate(quote.created_at)}</td></tr>
    </table>
  `;

  const options = {
    margin: 0.5,
    filename: `quote_${quote.quote_guid}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const safeDate = dateStr.replace(" ", "T");
  const date = new Date(safeDate);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  fetchUser_quotes();
});
</script>

<template>
  <div class="row min-vh-100">
    <LeftMenue />

    <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-content">
      <div class="card shadow-sm border-0">
        <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center">
          <span>Quotes management</span>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card shadow-sm">
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>Quote ID</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Provider</th>
                        <th>Premium</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(quote, index) in paginatedQuotes" :key="index">
                        <td>{{ quote.quote_guid }}</td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="avatar me-2">
                              {{ (quote.full_name || "NA").charAt(0) }}
                            </div>
                            <div>
                              <div class="fw-bold">{{ quote.full_name|| "Unknown" }}</div>
                              <div class="text-muted small">{{ quote.user_id || "N/A" }}</div>
                            </div>
                          </div>
                        </td>
                        <td v-if="quote.vehicles && quote.vehicles.length">
                          <div>{{ quote.vehicles[0].Year }} {{ quote.vehicles[0].Manufacturer }}</div>
                          <div class="text-muted small">VIN: {{ quote.vehicles[0].ID }}</div>
                        </td>
                        <td v-else>
                          <div>No Vehicle</div>
                        </td>
                        <td>{{ getCarrierDisplayName(quote.carrier_code) }}</td>
                        <td v-if="quote.vehicles && quote.vehicles.length">
                          <div>${{ quote.vehicles[0].VehicleTotal?.PremiumWithDecimal }}/yr</div>
                          <div class="text-muted small">
                            ${{ (quote.vehicles[0].VehicleTotal?.PremiumWithDecimal / 12).toFixed(2) }}/mo
                          </div>
                        </td>
                        <td v-else>
                          <div>-</div>
                        </td>
                        <td>
                          <span  :class="['badge',  quote.status === 1  ? 'bg-success status-badge'  : quote.status === 2   ? 'bg-warning text-dark status-badge' : 'bg-danger status-badge']"> {{ quote.status === 1  ? 'Active' : quote.status === 2 ? 'Pending'  : 'Cancelled'  }}</span>
                        </td>
                       
                        <td>{{ formatDate(quote.created_at) }}</td>
                        <td>
                          <div class="d-flex">
                            <button
                              class="btn btn-sm btn-outline-primary me-1"
                              title="View"
                              @click.stop="goToQuoteDetails(quote.id)">
                              <i class="fas fa-eye"></i>
                            </button>
                            <button 
                              class="btn btn-sm btn-outline-secondary" 
                              title="Download"
                              @click="downloadPDF(quote)"
                            >
                              <i class="fas fa-download"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

         
              <div class="card-footer bg-white">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="text-muted small">
                    Showing <span class="fw-bold">{{ showingFrom }}</span> to
                    <span class="fw-bold">{{ showingTo }}</span> of
                    <span class="fw-bold">{{ totalQuotes }}</span> entries
                  </div>
                  <nav>
                    <ul class="pagination mb-0">
                      <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
                      </li>

                      <li
                        v-for="page in totalPages"
                        :key="page"
                        class="page-item"
                        :class="{ active: currentPage === page }"
                      >
                        <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                      </li>

                      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
