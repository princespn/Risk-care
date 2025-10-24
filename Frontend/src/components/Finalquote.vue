<script setup>
import Sidebar from "./partial/Sidebar.vue";
import GA from "../assets/images/partner/GRP.png";
import HAL from "../assets/images/partner/HAL.png";

</script>

<template>
  <div class="row">
    <Sidebar />
    <div class="col-md-10 p-4">
      <h3 class="mb-4 fw-bold">We’ll make this fast and simple</h3>

    
      <div class="quote-box">
        <div class=" d-flex flex flex-md-row justify-content-between align-items-center mb-4">
          <div>
            <span class="badge fs-5 bg-success mb-2">Your Best Quote</span>
            <div  class="col-md-4"  v-if="finalGaResult && finalHalResult && finalGaResult.GA.premium <= finalHalResult.HAL.premium">
              <img :src="GA" :alt="getCarrierDisplayName(carrier)" height="200" />

              </div>
              <div class="col-md-4"  v-if="finalGaResult && finalHalResult && finalHalResult.HAL.premium < finalGaResult.GA.premium">
                <img :src="HAL" :alt="getCarrierDisplayName(carrier)" height="200" />
                </div>
              
          </div>
          <div class="text-end" v-if="finalGaResult && finalHalResult && finalGaResult.GA.premium <= finalHalResult.HAL.premium">
            <div class="text-muted fw-bold">Premium</div>
            <div class="quote-price">${{ finalGaResult.GA.premium }} <small class="text-muted">/ month</small></div>
            <div class="text-muted mb-3">${{ 12 * finalGaResult.GA.premium }}/ year</div>
            <button class="btn btn-success px-4 py-2 rounded-pill fw-semibold shadow-sm d-none d-md-inline">
              Confirm your details
            </button>
          </div>
          <div class="text-end" v-if="finalGaResult && finalHalResult && finalHalResult.HAL.premium < finalGaResult.GA.premium">
            <div class="text-muted fw-bold">Premium</div>
            <div class="quote-price">${{ finalHalResult.HAL.premium }} <small class="text-muted">/ month</small></div>
            <div class="text-muted mb-3">${{ 12 * finalHalResult.HAL.premium }}/ year</div>
            <button class="btn btn-success px-4 py-2 rounded-pill fw-semibold shadow-sm d-none d-md-inline">
              Confirm your details
            </button>
          </div>

        </div>
        <button class="btn btn-success w-100 py-2 rounded-pill fw-semibold shadow-sm d-inline d-md-none">
          Confirm your details
        </button>
      </div>



      <div class="mb-4">
        <h6><strong>1</strong> Edit your Quote</h6>
        <div class="row text-muted">
          <div class="col-sm-4">
            <strong>Vehicle:</strong> <i class="fa-solid fa-pen" @click="editVehicle"></i>

            <span class="col-sm-4" v-for="(vehicle, index) in vehicles" :key="'v' + index">
              <p>{{ vehicle.vehicle_model || 'N/A' }}</p>
            </span>
          </div>
          <div class="col-sm-4">
            <strong>Driver:</strong> <i class="fa-solid fa-pen" @click="editVehicle"></i>
            <span v-for="(driver, index) in drivers" :key="'d' + index">
              <p> {{ driver.first_name || 'N/A' }} </p>
            </span>

          </div>
          <div class="col-sm-4">
            <strong>Discount:</strong>
            <p>{{ discounts?.group_discount || 'N/A' }}</p>
          </div>
        </div>
      </div>

   
      <div class="mb-4">
        <h6><strong>2</strong> Customize your Coverage Options</h6>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Comprehensive Coverage</label>
            <select name="comprehensive-coverage" class="form-select">
              <option value="0">No Coverage</option>
              <option value="500">$500 Deductible</option>
              <option value="1000" selected>$1,000 Deductible</option>
              <option value="1500">$1,500 Deductible</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Collision Coverage</label>
            <select name="collision-coverage" class="form-select">
              <option value="0">No Coverage</option>
              <option value="500">$500 Deductible</option>
              <option value="1000" selected>$1,000 Deductible</option>
              <option value="1500">$1,500 Deductible</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Third Party Liability</label>
            <select name="third-party-liability" class="form-select">
              <option value="1000000" selected>$1,000,000</option>
              <option value="2000000">$2,000,000</option>
            </select>
          </div>
          <div class="row g-4">

            <div class="col-md-4" v-if="finalGaResult" v-for="(info, carrier) in finalGaResult" :key="carrier">
              <div class="other-option">
                <img :src="GA" :alt="getCarrierDisplayName(carrier)" height="200" />



                <div class="text-muted fw-bold">Premium</div>
                <div class="quote-price">${{ info.premium }} <small class="text-muted">/ month</small></div>
                <div class="text-muted">${{ 12 * (info.premium) }} / year</div>
              </div>
            </div>
            <div class="col-md-4" v-if="finalHalResult" v-for="(info, carrier) in finalHalResult" :key="carrier">
              <div class="other-option">
                <img :src="HAL" :alt="getCarrierDisplayName(carrier)" height="200" />



                <div class="text-muted fw-bold">Premium</div>
                <div class="quote-price">${{ info.premium }} <small class="text-muted">/ month</small></div>
                <div class="text-muted">${{ 12 * (info.premium) }} / year</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      to: "",
      subject: "This passwords from login to see your Quates-insurancerater.ca",
      vehicles: [],
      drivers: [],
      discounts: {},
      finalGaResult: null,
      finalHalResult: null,
    };
  },
  async mounted() {
    await this.getData_vehicle();
    await this.getData_driver();
    await this.getData_discount();
    this.callDynamicGARateApi();
    this.callDynamicHALRateApi();
  },
  computed: {

  allCarrierResults() {
    return {
      ...(this.finalGaResult || {}),
      ...(this.finalHalResult || {}),
      ...(this.finalAvivaResult || {}),
    };
  },

  bestCarrierResult() {
    let best = null;
    for (const [carrier, info] of Object.entries(this.allCarrierResults)) {
      if (!info?.premium) continue;
      if (!best || info.premium < best.premium) {
        best = { carrier, premium: info.premium };
      }
    }
    return best;
  },
},
  methods: {
    editVehicle() {
      this.$router.push({ path: "/autoquote/to/vehicle" });
    },
    editDriver() {
      this.$router.push({ path: "/autoquote/to/driver" });
    },
    editDiscount() {
      this.$router.push({ path: "/autoquote/to/discounts" });
    },

    extractMessages(carrierEntry) {
      const msg = carrierEntry?.CodeNames?.Auto?.QuoteInfo?.Message;
      if (!msg) return [];
      return Array.isArray(msg) ? msg.map(m => m.MessageText || '') : [msg.MessageText || ''];
    },
    async callDynamicGARateApi() {
      try {
        const vehicleIds = this.getVehicleIdsFromStorage();
        const driverIds = this.getDriverIdsFromStorage();
        if (!vehicleIds.length || !driverIds.length) return;

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 100000
        };


        const [vehicleResponse, driverResponse] = await Promise.all([
          axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_vehicles`, { vehicleIds }, config),
          axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_drivers`, { driverIds }, config)
        ]);

        const rawVehicles = vehicleResponse.data.vehicles;
        const rawDrivers = driverResponse.data.drivers;

    const vehicles = rawVehicles.map((v, index) => {
      const ID = `00000215${index + 1}`;
      return {
        ID,
        DistanceYearly: v.annual_distance_year || "1000",
        Location: v.vehicle_location_city || "EDMONTON",
        LocationIndex: v.vehicle_location_index || "619",
        Territory: "105",
        MakeAndModel: v.vehicle_make,
        Manufacturer: v.vehicle_model,
        DistanceDaily: v.annual_distance_day || "2",
        PostalCode: v.vehicle_location || "T6E1J1",
        VehType: "Private Passenger",
        ProductLine: v.primary_use,
        VehUse: v.primary_use || "Pleasure",
        VICCCode: v.vicc_code,
        VICCCodeExt: v.ext_vicc,
        Year: v.vehicle_year,
        Owned: v.is_leased,
        placingOffice: "MainOffice",
        PurchaseDate: `${v.acquired_year}${String(v.acquired_month).padStart(2, "0")}01`,
        PurchasedNew: "N",
        PurchasePrice: "20000",
        CurrentValue: "18000",
        ValueNew: "22000",
        AntitheftDevice: [
        { "DeviceType": "Monitored", "ID": 1, "Manufacturer": "Tag" },
        { "DeviceType": "Engraving", "ID": 2, "Manufacturer": "Tag" }
      ],
        Coverage: [
          { ID: `${ID}-TPBI`, CSIOCode: "TPBI", Limit1: 1000000 },
          { ID: `${ID}-UA`, CSIOCode: "UA" },
          { ID: `${ID}-AB`, CSIOCode: "AB" },
          { ID: `${ID}-TPDC`, CSIOCode: "TPDC", Deductible: 0 },
          { ID: `${ID}-TPPD`, CSIOCode: "TPPD", Limit1: 1000000 },
          { ID: `${ID}-COL`, CSIOCode: "COL", Deductible: 500 },
          { ID: `${ID}-CMP`, CSIOCode: "CMP", Deductible: 300 },
          { ID: `${ID}-TP`, CSIOCode: "TP", Limit1: 1000000 }
        ]
      };
    });

        const drivers = rawDrivers.map((d, index) => ({
          ID: `00000216${index + 1}`,
          first_name: d.first_name,
          last_name: d.last_name,
          occupational_status: d.occupational_status,
          Birthdate: `${d.dob_year}${String(d.dob_month).padStart(2, "0")}${String(d.dob_day).padStart(2, "0")}`,
          GridLevelEffDate: `${d.first_insured_year}0101`,
          DriverTraining: "N",
          DriverLicense: [{
            Country: d.license_country || "CA",
            ID: `00000217${index + 1}`,
            LicenseClass: d.license_class || "G",  // REQUIRED
            LicenseDate: `${d.full_license_year}${String(d.full_license_month).padStart(2, "0")}01`, // REQUIRED
            ProvinceState: d.license_province || "ON" // REQUIRED
          }],
          DateContinuousInsurance: "20210101",
          DateWithCompany: "20210101",
          Gender: d.gender || "M",
          RelationshipToApplicant: "Insured",
          MaritalStatus: d.marital_status || "S",  
          Retired: "N",
          OccupationCode: "999",
          GroupPlan: [{
            GroupPlanDescr: "CAA",
            ID: 1,
            VehType: "Private Passenger"
          }]
        }));

        const VehLink = vehicles.map((v, i) => ({
          VehicleID: v.ID,
          DriverID: drivers[0]?.ID || "00000216",
          PrincipalOperator: i === 0 ? "Y" : "N",
          Link: "Prn",
          Discount: Object.entries(this.discounts || {}).map(([key, val], idx) => ({
            ID: `Disc${i + 1}_${idx + 1}`,
            DiscountCode: val.code || 'DISDA',
            UserInitiated: "Y",
            RequestedAmount: parseFloat(val.group_discount) || 0.0,
            Applied: "Y",
            Descript: val.home_owner_type || "Driver Age"
          }))
        }));

        const payload = {
          quoteGuid: "990B776F0DDE414D9C906698FE3C0AF3",
          quoteIterationGuid: "BBC38638877B460FFFB9E89105C4DF61",
          carrierquoteGuid: "990B776F0DDE414D9C906698FE3C0AF3",
          province: "ON",
          renewal: "N",
          carriersXml: ["GA"],
          combinedPolicy: "A",
          contractAttrs: { vorGA: "A1000023937"},
          vehicles,
          drivers,
          VehLink
        };

       
        const rateResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/rate_bridge/aviva_ratebridge`,
          payload,
          config,
        );

        const quoteData = rateResponse.data?.["soap:Envelope"]?.["soap:Body"]?.["RateResponse"]
          ?.RateResult?.FortusOutputXML?.FortusTransaction?.Carriers;

        this.finalGaResult = {};

 
    
        for (const carrierKey in quoteData) {
          const carrierEntry = quoteData[carrierKey];
          const policyTotal = carrierEntry?.CodeNames?.Auto?.QuoteInfo?.PolicyTotal;


          this.finalGaResult[carrierKey] = {
            carrier: carrierKey,
            premium: policyTotal?.PremiumWithDecimal || "0.00"
          };
        }
      } catch (error) {
        console.error("Error calling dynamic_rate API:", error);
      }
    },
    async callDynamicHALRateApi() {
      try {
        const vehicleIds = this.getVehicleIdsFromStorage();
        const driverIds = this.getDriverIdsFromStorage();
        if (!vehicleIds.length || !driverIds.length) return;

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 100000
        };


        const [vehicleResponse, driverResponse] = await Promise.all([
          axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_vehicles`, { vehicleIds }, config),
          axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_drivers`, { driverIds }, config)
        ]);

        const rawVehicles = vehicleResponse.data.vehicles;
        const rawDrivers = driverResponse.data.drivers;

    const vehicles = rawVehicles.map((v, index) => {
      const ID = `00000215${index + 1}`;
      return {
        ID,
        DistanceYearly: v.annual_distance_year || "1000",
        Location: v.vehicle_location_city || "EDMONTON",
        LocationIndex: v.vehicle_location_index || "619",
        Territory: "105",
        MakeAndModel: v.vehicle_make,
        Manufacturer: v.vehicle_model,
        DistanceDaily: v.annual_distance_day || "2",
        PostalCode: v.vehicle_location || "T6E1J1",
        VehType: "Private Passenger",
        VehBodyTypeCd: "SUV",
        ProductLine: v.primary_use,
        VehUse: "Pleasure",
        VICCCode: v.vicc_code,
        VICCCodeExt: v.ext_vicc,
        Year: v.vehicle_year,
        Owned: v.is_leased,
        //placingOffice: "TORONTO",
        PurchaseDate: `${v.acquired_year}${String(v.acquired_month).padStart(2, "0")}01`,
        //PurchaseDate: "20230808",
        VehUseCd: "Pleasure",
        PurchasedNew: "N",
        PurchasePrice: "20000",
        CurrentValue: "18000",
        ValueNew: "22000",
        AntitheftDevice: [
        { "DeviceType": "Monitored", "ID": 1, "Manufacturer": "Tag" },
        { "DeviceType": "Engraving", "ID": 2, "Manufacturer": "Tag" }
      ],
        Coverage: [
          { ID: `${ID}-TPBI`, CSIOCode: "TPBI", Limit1: 1000000 },
          { ID: `${ID}-UA`, CSIOCode: "UA" },
          { ID: `${ID}-AB`, CSIOCode: "AB" },
          { ID: `${ID}-TPDC`, CSIOCode: "TPDC", Deductible: 0 },
          { ID: `${ID}-TPPD`, CSIOCode: "TPPD", Limit1: 1000000 },
          { ID: `${ID}-COL`, CSIOCode: "COL", Deductible: 500 },
          { ID: `${ID}-CMP`, CSIOCode: "CMP", Deductible: 300 },
          { ID: `${ID}-TP`, CSIOCode: "TP", Limit1: 1000000 }
        ]
      };
    });

        const drivers = rawDrivers.map((d, index) => ({
          ID: `00000216${index + 1}`,
          first_name: d.first_name,
          last_name: d.last_name,
          occupational_status: d.occupational_status,
          Birthdate: `${d.dob_year}${String(d.dob_month).padStart(2, "0")}${String(d.dob_day).padStart(2, "0")}`,
          GridLevelEffDate: `${d.first_insured_year}0101`,
          DriverTraining: "N",
          DriverLicense: [{
            Country: d.license_country || "CA",
            ID: `00000217${index + 1}`,
            LicenseClass: d.license_class || "G", 
            LicenseDate: `${d.full_license_year}${String(d.full_license_month).padStart(2, "0")}01`, // REQUIRED
            ProvinceState: d.license_province || "ON" // REQUIRED
          }],
          DateContinuousInsurance: "20210101",
          DateWithCompany: "20210101",
          Gender: d.gender || "M",
          RelationshipToApplicant: "Insured",
          MaritalStatus: d.marital_status || "S",  
          Retired: "N",
          OccupationCode: "999",
          GroupPlan: [{
            GroupPlanDescr: "CAA",
            ID: 1,
            VehType: "Private Passenger"
          }]
        }));

        const VehLink = vehicles.map((v, i) => ({
          VehicleID: v.ID,
          DriverID: drivers[0]?.ID || "00000216",
          PrincipalOperator: i === 0 ? "Y" : "N",
          Link: "Prn",
          Discount: Object.entries(this.discounts || {}).map(([key, val], idx) => ({
            ID: `Disc${i + 1}_${idx + 1}`,
            DiscountCode: val.code || 'DISDA',
            UserInitiated: "Y",
            RequestedAmount: parseFloat(val.group_discount) || 0.0,
            Applied: "Y",
            Descript: val.home_owner_type || "Driver Age"
          }))
        }));

        const payload = {
          quoteGuid: "990B776F0DDE414D9C906698FE3C0AF3",
          quoteIterationGuid: "BBC38638877B460FFFB9E89105C4DF61",
          carrierquoteGuid: "990B776F0DDE414D9C906698FE3C0AF3",
          province: "ON",
          renewal: "N", 
          carriersXml: ["HAL"],
          combinedPolicy: "A",
          contractAttrs: { vorHAL: "45893"},    
          vehicles,
          drivers,
          VehLink
        };

       
        const rateResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/rate_bridge/intact_ratebridge`,
          payload,
          config,
        );

        const quoteData = rateResponse.data?.["soap:Envelope"]?.["soap:Body"]?.["RateResponse"]
          ?.RateResult?.FortusOutputXML?.FortusTransaction?.Carriers;

        this.finalHalResult = {};

 
    
        for (const carrierKey in quoteData) {
          const carrierEntry = quoteData[carrierKey];
          const policyTotal = carrierEntry?.CodeNames?.Auto?.QuoteInfo?.PolicyTotal;


          this.finalHalResult[carrierKey] = {
            carrier: carrierKey,
            premium: policyTotal?.PremiumWithDecimal || "0.00"
          };
        }
      } catch (error) {
        console.error("Error calling dynamic_rate API:", error);
      }
    },

    getVehicleIdsFromStorage() {
      const rawData = localStorage.getItem("vehicleIdsData");
      if (!rawData) {
        alert("Vehicle data not found. Redirecting...");
        this.$router.push({ path: "/" });
        return [];
      }
      try {
        const parsed = JSON.parse(rawData);
        return parsed.vehicleIds || [];
      } catch (e) {
        console.error("Error parsing vehicleIdsData:", e);
        return [];
      }
    },

    getDriverIdsFromStorage() {
      const rawData = localStorage.getItem("driverIdsData");
      if (!rawData) {
        alert("Driver data not found. Redirecting...");
        this.$router.push({ path: "/" });
        return [];
      }
      try {
        const parsed = JSON.parse(rawData);
        return parsed.driverIds || [];
      } catch (e) {
        console.error("Error parsing driverIdsData:", e);
        return [];
      }
    },

    getDiscountDataFromStorage() {
      const rawData = localStorage.getItem("discountFormData");
      if (!rawData) {
        alert("Discount data not found. Redirecting...");
        this.$router.push({ path: "/" });
        return null;
      }
      try {
        const parsed = JSON.parse(rawData);
        return parsed.data || null;
      } catch (e) {
        console.error("Error parsing discountFormData:", e);
        return null;
      }
    },

    async getData_vehicle() {
      const vehicleIds = this.getVehicleIdsFromStorage();
      if (vehicleIds.length === 0) return;
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_vehicles`, { vehicleIds });
        this.vehicles = response.data.vehicles;
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    },

    async getData_driver() {
      const driverIds = this.getDriverIdsFromStorage();
      if (driverIds.length === 0) return;
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicle/get_drivers`, { driverIds });
        this.drivers = response.data.drivers;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },

    async getData_discount() {
      const discountData = this.getDiscountDataFromStorage();
      if (!discountData) return;
      this.discounts = discountData;
    },


    getCarrierDisplayName(code) {
      const names = {
        GA: 'Aviva',
        HAL: 'Intact Insurance',
        WAWA: 'Wawanesa Mutual',
        GA2: 'Aviva II',
        SGI: 'SG Canada',
        ECON: 'Economical',
        TRG: 'Travelers',
        COA: 'Coachman',
        DOC: 'Desjardins',
        FAC: 'Facility',
      };
      return names[code] || code;
    }

  }
};
</script>