<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import LeftMenue from "./LeftMenue.vue";
import html2pdf from "html2pdf.js";

const route = useRoute();
const quoteId = route.params.id;

const loading = ref(true);
const error = ref(null);

const quote = ref({
  status: 2, 
  vehicles: [{}],
  drivers: [{}],
});

onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/get_quotes/${quoteId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    quote.value = response.data || { status: 2, vehicles: [{}], drivers: [{}] };
  } catch (err) {
    error.value = "Failed to fetch quote details";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const updatePolicyStatus = async (newStatus) => {
  let confirmMsg = "";
  if (newStatus === 1) confirmMsg = "Are you sure you want to activate this policy?";
  if (newStatus === 0) confirmMsg = "Are you sure you want to cancel this policy?";

  if (confirmMsg && !confirm(confirmMsg)) return;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/update_quote/${quoteId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      quote.value.status = newStatus;
      alert(
        newStatus === 1
          ? "Policy activated successfully."
          : "Policy cancelled successfully."
      );
    } else {
      alert("Failed to update policy. Please try again.");
    }
  } catch (err) {
    console.error("Update API error:", err);
    alert("Something went wrong while updating the policy.");
  }
};

const exportPDF = () => {
  const element = document.getElementById("quote-details");
  const options = {
    margin: 0.5,
    filename: "quote-details.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(options).from(element).save();
};

const printQuote = () => {
  const printContents = document.getElementById("quote-details").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
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

const NewformatDate = (dateStr) => {
  if (!dateStr) return "-";

  const safeDate = dateStr.replace(" ", "T");
  const date = new Date(safeDate);

  if (isNaN(date)) return dateStr;

  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-US", options);
};

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
</script>

<template>
    <div class="row min-vh-100">
      <LeftMenue />
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-3">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <button class="btn btn-outline-success d-md-none me-3" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebar" aria-controls="mobileSidebar">
                <i class="fas fa-bars"></i>
            </button>
            <h2 class="fw-bold mb-0">Quote Details</h2>
            <div class="d-flex gap-2">
                <button @click="printQuote" class="btn btn-outline-secondary">
                    <i class="fas fa-print me-1"></i> Print
                  </button>
                <button @click="exportPDF" class="btn btn-outline-danger">
                    <i class="fas fa-file-pdf me-1"></i> Export PDF
                </button>
            </div>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
        <div id="quote-details" v-else-if="quote">
        <div  class="card shadow-sm mb-4 quote-header">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <span
                        :class="[
                          'badge',
                          quote.status === 1
                            ? 'bg-success status-badge'
                            : quote.status === 2
                            ? 'bg-warning text-dark status-badge'
                            : 'bg-danger status-badge',
                        ]"
                      >
                        {{
                          quote.status === 1
                            ? "Active"
                            : quote.status === 2
                            ? "Pending"
                            : "Cancelled"
                        }}
                      </span>
      
                        <h3 class="mb-1">{{ getCarrierDisplayName(quote.carrier_code) }} Insurance</h3>
                        <p class="text-muted mb-0">Policy #: INS-2024-78945</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <div class="d-flex flex-column flex-md-row justify-content-md-end align-items-md-center gap-3">
                            <div>
                                <span class="d-block text-muted small">Premium</span>
                                <h4 class="mb-0">${{ (quote.vehicles[0].VehicleTotal?.PremiumWithDecimal / 12).toFixed(2) }} <small class="text-muted fs-6">/ month</small></h4>
                                <span class="text-muted">${{ quote.vehicles[0].VehicleTotal?.PremiumWithDecimal }} / year</span>
                            </div>
                            <div>
                                <span class="badge bg-success payment-badge">
                                    <i class="fas fa-check-circle me-1"></i> Paid
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-6 mb-4 mb-md-0">
                <div class="card h-100 detail-card">
                    <div class="card-header">
                        <i class="fas fa-user me-2"></i> Customer Information
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-6">
                                <p class="text-muted small mb-1">Full Name</p>
                                <p class="fw-bold">{{quote.full_name}}</p>
                            </div>
                            <div class="col-6">
                                <p class="text-muted small mb-1">Date of Birth</p>
                                <p class="fw-bold">{{ formatDate(quote.drivers[0].Birthdate) }}</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <p class="text-muted small mb-1">Email</p>
                                <p class="fw-bold">{{quote.user_id}}</p>
                            </div>
                            <div class="col-6">
                                <p class="text-muted small mb-1">Phone</p>
                                <p class="fw-bold">+1 (416) 555-0192</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p class="text-muted small mb-1">Address</p>
                                <p class="fw-bold">123 Main Street, Toronto, ON M5V 2H1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card h-100 detail-card">
                    <div class="card-header">
                        <i class="fas fa-file-invoice me-2"></i> Policy Details
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-6">
                                <p class="text-muted small mb-1">Policy Start Date</p>
                                <p class="fw-bold">15/08/2024</p>
                            </div>
                            <div class="col-6">
                                <p class="text-muted small mb-1">Policy End Date</p>
                                <p class="fw-bold">14/08/2025</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <p class="text-muted small mb-1">Payment Method</p>
                                <p class="fw-bold">Credit Card (VISA ****4532)</p>
                            </div>
                            <div class="col-6">
                                <p class="text-muted small mb-1">Payment Frequency</p>
                                <p class="fw-bold">Monthly</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p class="text-muted small mb-1">Quote Created</p>
                                <p class="fw-bold">{{ NewformatDate(quote.created_at) }}</p>
                            </div>
                            <div class="col-6">
                                <p class="text-muted small mb-1">Policy Issued</p>
                                <p class="fw-bold">{{ NewformatDate(quote.created_at) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Vehicle Information -->
        <div class="card shadow-sm mb-4">
            <div class="card-header">
                <i class="fas fa-car me-2"></i> Vehicle Information
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 mb-3 mb-md-0">
                        <p class="text-muted small mb-1">Year</p>
                        <p class="fw-bold">{{  quote.vehicles[0].Year }}</p>
                    </div>
                    <div class="col-md-3 mb-3 mb-md-0">
                        <p class="text-muted small mb-1">Make</p>
                        <p class="fw-bold">{{  quote.vehicles[0].Manufacturer }}</p>
                    </div>
                    <div class="col-md-3 mb-3 mb-md-0">
                        <p class="text-muted small mb-1">Model</p>
                        <p class="fw-bold">{{  quote.vehicles[0].MakeAndModel }}</p>
                    </div>
                    <div class="col-md-3">
                        <p class="text-muted small mb-1">VIN</p>
                        <p class="fw-bold">1HGCR2F3XHA123456</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Coverage Details -->
        <div class="card shadow-sm mb-4">
            <div class="card-header">
                <i class="fas fa-shield-alt me-2"></i> Coverage Details
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0 coverage-table">
                        <thead class="table-light">
                            <tr>
                                <th>Coverage Type</th>
                                <th>Coverage Amount</th>
                                <th>Deductible</th>
                                <th>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Third Party Liability</td>
                                <td>$1,000,000</td>
                                <td>N/A</td>
                                <td>$850.00</td>
                            </tr>
                            <tr>
                                <td>Collision</td>
                                <td>Actual Value</td>
                                <td>$500</td>
                                <td>$620.00</td>
                            </tr>
                            <tr>
                                <td>Comprehensive</td>
                                <td>Actual Value</td>
                                <td>$500</td>
                                <td>$480.00</td>
                            </tr>
                            <tr>
                                <td>Accident Benefits</td>
                                <td>Standard</td>
                                <td>N/A</td>
                                <td>$350.00</td>
                            </tr>
                            <tr class="table-active">
                                <td><strong>Total Annual Premium</strong></td>
                                <td></td>
                                <td></td>
                                <td><strong>$2,500.00</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Discounts & Additional Info -->
        <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
                <div class="card h-100 shadow-sm">
                    <div class="card-header">
                        <i class="fas fa-percentage me-2"></i> Applied Discounts
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Multi-Vehicle Discount
                                <span class="badge bg-success">15%</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Bundled Home Insurance
                                <span class="badge bg-success">10%</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Claims-Free Discount
                                <span class="badge bg-success">5%</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Safe Driver Discount
                                <span class="badge bg-success">5%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <div class="card-header">
                        <i class="fas fa-info-circle me-2"></i> Additional Information
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <p class="text-muted small mb-1">Driving History</p>
                            <p class="fw-bold">No accidents or tickets in past 3 years</p>
                        </div>
                        <div class="mb-3">
                            <p class="text-muted small mb-1">License Status</p>
                            <p class="fw-bold">G License since 2010</p>
                        </div>
                        <div>
                            <p class="text-muted small mb-1">Additional Notes</p>
                            <p class="fw-bold">Customer opted for paperless billing and automatic payments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

       
        <div class="d-flex justify-content-end gap-3 mt-4 action-btns">
            <button class="btn btn-outline-primary">
                <i class="fas fa-edit me-1"></i> Edit Policy
            </button>
            <button class="btn btn-outline-success">
                <i class="fas fa-envelope me-1"></i>
                <Document_upload />
              </button>
            <button
            v-if="quote.status === 2"
            @click="updatePolicyStatus(1)"
            class="btn btn-success"
          >
            <i class="fas fa-check me-1"></i> Activate Policy
          </button>
         
          <button
            v-else-if="quote.status === 1"
            @click="updatePolicyStatus(0)"
            class="btn btn-danger"
          >
            <i class="fas fa-times me-1"></i> Cancel Policy
          </button>
  
          <button
          v-else-if="quote.status === 0"
          @click="updatePolicyStatus(1)"
          class="btn btn-success"
        >
          <i class="fas fa-times me-1"></i> Activate Policy
        </button>
        </div>
    </main>
    </div>
  </template>
  
 <style>
        :root {
            --primary-color: #01614d;
            --hover-color: #0bebbe;
            --success-color: #28a745;
        }
        
        .admin-sidebar {
            background-color: var(--primary-color);
        }
        .admin-sidebar .nav-link {
            color: #ecf0f1;
            border-radius: 5px;
            margin-bottom: 5px;
            transition: all 0.3s ease;
        }
        .admin-sidebar .nav-link:hover, 
        .admin-sidebar .nav-link.active {
            background-color: var(--hover-color);
            color: #fff;
        }
        .table-hover tbody tr:hover {
            background-color: rgba(11, 235, 190, 0.1);
            cursor: pointer;
        }
        .status-badge {
            font-size: 0.75rem;
            padding: 0.35rem 0.65rem;
        }
        .badge-status {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            background-color: var(--success-color);
        }
        .payment-badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
        .search-box {
            max-width: 300px;
        }
        .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .card-header {
            background-color: #fff;
            border-bottom: 1px solid rgba(0,0,0,.125);
            font-weight: 600;
        }
        .btn-success {
            background-color: var(--success-color);
            border-color: var(--success-color);
        }
        .quote-header {
            background-color: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid var(--primary-color);
        }
        .detail-card {
            border-left: 4px solid var(--primary-color);
            border-radius: 5px;
        }
        .coverage-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        .list-group-item {
            transition: all 0.3s ease;
        }
        .list-group-item:hover {
            background-color: rgba(11, 235, 190, 0.1);
        }
        .btn-outline-primary {
            color: var(--primary-color);
            border-color: var(--primary-color);
        }
        .btn-outline-primary:hover {
            background-color: var(--primary-color);
            color: white;
        }
        .action-btns .btn {
            min-width: 120px;
        }
    </style>

