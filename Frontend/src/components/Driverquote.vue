<script setup>
import Sidebar from "./partial/Sidebar.vue";
</script>
<template>
    <div class="row min-vh-100">
        <Sidebar />
        <div class="col-md-10 p-5 tab">


            <h3 class="form-title">We’ll make this fast and simple</h3>


            <p class="form-subtitle">1. Fill your Driver Details</p>


          
            <ul class="nav nav-tabs d-flex">
                <li class="nav-item" v-for="(vehicle, index) in vehicles" :key="vehicle.id">
                    <a href="#" class="nav-link" :class="{ active: activeTab === vehicle.id }"
                        @click.prevent="activeTab = vehicle.id">{{ (vehicle.first_name && vehicle.last_name)
                            ? `${vehicle.first_name} ${vehicle.last_name}`
                            : `Driver #${index + 1}` }}</a>
                            <button v-if="vehicles.length > 2"  class="remove-btn" @click="removeVehicle(index)">Remove</button>
    
                </li>

                <li class="ms-auto" id="addDriverButton" @click="addVehicle">
                    <button class="btn btn-success px-3 py-1 mb-1 rounded-pill">
                        <i class="fas fa-plus me-2"></i>
                        <span class="d-none d-sm-inline">New Driver</span>
                    </button>
                </li>

            </ul>
            <div class="border border-2 p-1">
                <div class="row  g-4  container mt-0  p-1" v-for="(vehicle, index) in vehicles" :key="vehicle.id"
                    v-show="activeTab === vehicle.id">
                    <div class="col-md-6">
                        <label class="form-label">First Name</label>
                        <input type="text" v-model="vehicle.first_name" class="form-control" placeholder="First Name" />
                        <span v-if="validationErrors[vehicle.id]?.first_name" class="error">
                            {{ validationErrors[vehicle.id].first_name }}
                            </span>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Last Name</label>
                        <input type="text" v-model="vehicle.last_name" class="form-control" placeholder="Last Name" />
                             <span v-if="validationErrors[vehicle.id]?.last_name" class="error">
                            {{ validationErrors[vehicle.id].last_name }}
                            </span>
                    </div>


                    <div class="col-md-6">
                        <label class="form-label">Marital Status</label>
                        <select v-model="vehicle.marital_status" class="form-select" id="marital_status"
                            aria-labelledby="ariaMaritalStatus" required>
                            <option>Select</option>
                            <option value="S" selected="selected">Single</option>
                            <option value="M">Married/Common Law</option>
                            <!--<option value="other">Other</option>-->
                        </select>
                         <span v-if="validationErrors[vehicle.id]?.marital_status" class="error">
                            {{ validationErrors[vehicle.id].marital_status }}
                            </span>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Date of Birth</label>
                        <div class="d-flex gap-2">
                            <select v-model="vehicle.dob_month" id="dob_month" class="form-select"
                                aria-label="Date of birth">
                                <option value="" selected>Month</option>
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

                            <select v-model="vehicle.dob_day" id="dob_day" class="form-select"
                                aria-label="Date of birth">
                                <option value="" selected>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select v-model="vehicle.dob_year" id="dob_year" class="form-select"
                                aria-label="Date of birth">
                                <option value="" selected>Year</option>
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
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
                                <option value="1989">1989</option>
                                <option value="1988">1988</option>
                                <option value="1987">1987</option>
                                <option value="1986">1986</option>
                                <option value="1985">1985</option>
                                <option value="1984">1984</option>
                                <option value="1983">1983</option>
                                <option value="1982">1982</option>
                                <option value="1981">1981</option>
                                <option value="1980">1980</option>
                                <option value="1979">1979</option>
                                <option value="1978">1978</option>
                                <option value="1977">1977</option>
                                <option value="1976">1976</option>
                                <option value="1975">1975</option>
                                <option value="1974">1974</option>
                                <option value="1973">1973</option>
                                <option value="1972">1972</option>
                                <option value="1971">1971</option>
                                <option value="1970">1970</option>
                                <option value="1969">1969</option>
                                <option value="1968">1968</option>
                                <option value="1967">1967</option>
                                <option value="1966">1966</option>
                                <option value="1965">1965</option>
                                <option value="1964">1964</option>
                                <option value="1963">1963</option>
                                <option value="1962">1962</option>
                                <option value="1961">1961</option>
                                <option value="1960">1960</option>
                                <option value="1959">1959</option>
                                <option value="1958">1958</option>
                                <option value="1957">1957</option>
                                <option value="1956">1956</option>
                                <option value="1955">1955</option>
                                <option value="1954">1954</option>
                                <option value="1953">1953</option>
                                <option value="1952">1952</option>
                                <option value="1951">1951</option>
                                <option value="1950">1950</option>
                                <option value="1949">1949</option>
                                <option value="1948">1948</option>
                                <option value="1947">1947</option>
                                <option value="1946">1946</option>
                                <option value="1945">1945</option>
                                <option value="1944">1944</option>
                                <option value="1943">1943</option>
                                <option value="1942">1942</option>
                                <option value="1941">1941</option>
                                <option value="1940">1940</option>
                                <option value="1939">1939</option>
                                <option value="1938">1938</option>
                                <option value="1937">1937</option>
                                <option value="1936">1936</option>
                                <option value="1935">1935</option>
                                <option value="1934">1934</option>
                                <option value="1933">1933</option>
                                <option value="1932">1932</option>
                                <option value="1931">1931</option>
                                <option value="1930">1930</option>
                                <option value="1929">1929</option>
                                <option value="1928">1928</option>
                                <option value="1927">1927</option>
                                <option value="1926">1926</option>
                                <option value="1925">1925</option>
                                <option value="1924">1924</option>
                                <option value="1923">1923</option>
                                <option value="1922">1922</option>
                                <option value="1921">1921</option>
                                <option value="1920">1920</option>
                            </select>
                        </div>
                               <span v-if="validationErrors[vehicle.id]?.dob" class="error">
                            {{ validationErrors[vehicle.id].dob }}
                            </span>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Occupational Status</label>
                        <select v-model="vehicle.occupational_status" class="form-select" id="occupational_status">
                            <option selected="selected">Select</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Student">Student</option>
                            <option value="Retired">Retired</option>
                        </select>
                             <span v-if="validationErrors[vehicle.id]?.occupational_status" class="error">
                            {{ validationErrors[vehicle.id].occupational_status }}
                            </span>

                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Gender</label>
                        <select v-model="vehicle.gender" class="form-select" id="gender" aria-labelledby="ariaGender">
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                             <span v-if="validationErrors[vehicle.id]?.gender" class="error">
                            {{ validationErrors[vehicle.id].gender }}
                            </span>
                    </div>


                    <hr class="my-4" />

                    <h5 class="fw-semibold mb-3">2. License Information</h5>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label"> What type of licence does {{ vehicle.first_name || `Driver
                                ${index + 1}` }} currently hold?</label>
                            <select v-model="vehicle.license_class" id="license-class" class="form-select">
                                <option value="G1">G1</option>
                                <option value="G2">G2</option>
                                <option value="G" selected="">G</option>
                            </select>

          <span v-if="validationErrors[vehicle.id]?.license_class" class="error">
                            {{ validationErrors[vehicle.id].license_class }}
                            </span>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">How old was {{ vehicle.first_name || `Driver ${index + 1}` }}
                                when he or she was first
                                licensed in Ontario?</label>
                            <input type="text" v-model="vehicle.age_numb" class="form-control"
                                placeholder="Enter Age Number" />
                                
          <span v-if="validationErrors[vehicle.id]?.age_numb" class="error">
                            {{ validationErrors[vehicle.id].age_numb }}
                            </span>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Did {{ vehicle.first_name || `Driver ${index + 1}` }}
                                previously hold a full license
                                else where in Canada or the U.S?</label>
                            <select v-model="vehicle.has_foreign_license" id="has_foreign_license0" class="form-select">
                                <option value="1">Yes</option>
                                <option value="0" selected="">No</option>
                            </select>
                              <span v-if="validationErrors[vehicle.id]?.has_foreign_license" class="error">
                            {{ validationErrors[vehicle.id].has_foreign_license }}
                            </span>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">G License Date</label>
                            <div class="d-flex gap-2">
                                <select v-model="vehicle.full_license_month" id="full_license_month"
                                    aria-labelledby="ariaFullLicense" class="form-select">
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
                                <select v-model="vehicle.full_license_year" id="full_license_year" class="form-select">
                                    <option value="">Year</option>
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
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>
                                    <option value="1929">1929</option>
                                    <option value="1928">1928</option>
                                    <option value="1927">1927</option>
                                    <option value="1926">1926</option>
                                    <option value="1925">1925</option>
                                    <option value="1924">1924</option>
                                    <option value="1923">1923</option>
                                    <option value="1922">1922</option>
                                    <option value="1921">1921</option>
                                    <option value="1920">1920</option>
                                </select>

                            </div>
                              <span v-if="validationErrors[vehicle.id]?.full_license_date" class="error">
                            {{ validationErrors[vehicle.id].full_license_date }}
                            </span>
                        </div>
                    </div>


                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">When was {{ vehicle.first_name || `Driver ${index + 1}` }} first
                                listed as a driver on a
                                insurance policy in Canada or the U.S ?</label>
                            <select v-model="vehicle.first_insured_year" id="first_insured_year"
                                aria-labelledby="ariaFirstInsurance" class="form-select">
                                <option value="">Year</option>
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
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
                                <option value="1989">1989</option>
                                <option value="1988">1988</option>
                                <option value="1987">1987</option>
                                <option value="1986">1986</option>
                                <option value="1985">1985</option>
                                <option value="1984">1984</option>
                                <option value="1983">1983</option>
                                <option value="1982">1982</option>
                                <option value="1981">1981</option>
                                <option value="1980">1980</option>
                                <option value="1979">1979</option>
                                <option value="1978">1978</option>
                                <option value="1977">1977</option>
                                <option value="1976">1976</option>
                                <option value="1975">1975</option>
                                <option value="1974">1974</option>
                                <option value="1973">1973</option>
                                <option value="1972">1972</option>
                                <option value="1971">1971</option>
                                <option value="1970">1970</option>
                                <option value="1969">1969</option>
                                <option value="1968">1968</option>
                                <option value="1967">1967</option>
                                <option value="1966">1966</option>
                                <option value="1965">1965</option>
                                <option value="1964">1964</option>
                                <option value="1963">1963</option>
                                <option value="1962">1962</option>
                                <option value="1961">1961</option>
                                <option value="1960">1960</option>
                                <option value="1959">1959</option>
                                <option value="1958">1958</option>
                                <option value="1957">1957</option>
                                <option value="1956">1956</option>
                                <option value="1955">1955</option>
                                <option value="1954">1954</option>
                                <option value="1953">1953</option>
                                <option value="1952">1952</option>
                                <option value="1951">1951</option>
                                <option value="1950">1950</option>
                                <option value="1949">1949</option>
                                <option value="1948">1948</option>
                                <option value="1947">1947</option>
                                <option value="1946">1946</option>
                                <option value="1945">1945</option>
                                <option value="1944">1944</option>
                                <option value="1943">1943</option>
                                <option value="1942">1942</option>
                                <option value="1941">1941</option>
                                <option value="1940">1940</option>
                                <option value="1939">1939</option>
                                <option value="1938">1938</option>
                                <option value="1937">1937</option>
                                <option value="1936">1936</option>
                                <option value="1935">1935</option>
                                <option value="1934">1934</option>
                                <option value="1933">1933</option>
                                <option value="1932">1932</option>
                                <option value="1931">1931</option>
                                <option value="1930">1930</option>
                                <option value="1929">1929</option>
                                <option value="1928">1928</option>
                                <option value="1927">1927</option>
                                <option value="1926">1926</option>
                                <option value="1925">1925</option>
                                <option value="1924">1924</option>
                                <option value="1923">1923</option>
                                <option value="1922">1922</option>
                                <option value="1921">1921</option>
                                <option value="1920">1920</option>
                            </select>
  <span v-if="validationErrors[vehicle.id]?.first_insured_year" class="error">
                            {{ validationErrors[vehicle.id].first_insured_year }}
                            </span>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">How long has {{ vehicle.first_name || `Driver ${index + 1}` }}
                                been with his or her current insurance
                                company?</label>
                            <select v-model="vehicle.time_with_insurer" id="time_with_insurer" class="form-select"
                                data-single-template="1 year">
                                <option value="" selected="">Select</option>
                                <option value="0">Less than a year</option>
                                <option value="1">1 year</option>
                                <option value="2">2 years</option>
                                <option value="3">3 years</option>
                                <option value="4">4 years</option>
                                <option value="5">5 years</option>
                                <option value="6">6 years</option>
                            </select>
                            <span v-if="validationErrors[vehicle.id]?.time_with_insurer" class="error">
                            {{ validationErrors[vehicle.id].time_with_insurer }}
                            </span>
                        </div>
                    </div>

                    <hr class="my-4" />

                    <div class="custom-card my-4">
                        <h6 class="fw-bold text-danger mb-2">
                            <i class="fas fa-ban me-2"></i> Insurance Cancellation
                        </h6>
                        <p class="mb-2">
                            In the past 3 years, has you ever had:
                            <br />
                            • An insurance company cancel their policy?
                            <br />
                            • Any time without insurance coverage?
                        </p>
                        <div class="d-flex gap-3">
                            <button type="button" class="btn btn-toggle"
                                :class="vehicle.insuranceCancelled ? 'btn-success active' : 'btn-outline-success'"
                                @click="vehicle.insuranceCancelled = true">
                                Yes
                            </button>

                            <button type="button" class="btn btn-toggle"
                                :class="vehicle.insuranceCancelled === false ? 'btn-success active' : 'btn-outline-success'"
                                @click="vehicle.insuranceCancelled = false">
                                No
                            </button>
                        </div>
                    </div>
                    <div class="row g-3" v-if="vehicle.insuranceCancelled">

                        <ul class="nav nav-tabs d-flex">
                            <li v-for="(reason, rIndex) in vehicle.reasons" :key="`reason-tab-${vehicle.id}-${rIndex}`"
                                class="nav-item">
                                <a href="#" class="nav-link" :class="{ active: activeReasonTab[vehicle.id] === rIndex }"
                                    @click.prevent="activeReasonTab[vehicle.id] = rIndex"> Reason #{{ rIndex + 1 }} </a>
                            </li>
                            <li class="nav-item ms-auto">
                                <button class="btn btn-success px-4 py-2 rounded-pill d-inline-block"
                                    @click="addNewReason(index)">
                                    <i class="fas fa-plus me-2"></i> Add New Reason
                                </button>
                            </li>

                        </ul>

                        <div v-for="(reason, rIndex) in vehicle.reasons" :key="`reason-${vehicle.id}-${rIndex}`"
                            v-show="activeReasonTab[vehicle.id] === rIndex" class="cancellation-reason">
                            <label for="reason">{{ rIndex + 1 }} <strong> -Reason for cancellation</strong> </label>
                            <div class="col-md-6">
                                <select name="cancellation-reason" v-model="reason.cancellationReason"
                                    class="form-select">
                                    <option value="" selected>Select a Reason...</option>
                                    <option value="NonPay">Cancelled for non-payment</option>
                                    <option value="OtherLapse">Cancelled for other reason</option>
                                    <option value="NoInsuranceNeeded">No car/no insurance needed</option>
                                    <option value="MatMisrep">Cancelled for material misrepresentation</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label> select the start date of the insurance cancellation.</label>
                                <div class="d-flex gap-2">
                                    <select v-model="reason.reason_month" id="reason-month" aria-labelledby="ariareason"
                                        class="form-select">
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

                                    <select v-model="reason.reason_year" id="reason-year" aria-labelledby="ariareason"
                                        class="form-select">
                                        <option value="">Year</option>
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
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>
                                        <option value="1949">1949</option>
                                        <option value="1948">1948</option>
                                        <option value="1947">1947</option>
                                        <option value="1946">1946</option>
                                        <option value="1945">1945</option>
                                        <option value="1944">1944</option>
                                        <option value="1943">1943</option>
                                        <option value="1942">1942</option>
                                        <option value="1941">1941</option>
                                        <option value="1940">1940</option>
                                        <option value="1939">1939</option>
                                        <option value="1938">1938</option>
                                        <option value="1937">1937</option>
                                        <option value="1936">1936</option>
                                        <option value="1935">1935</option>
                                        <option value="1934">1934</option>
                                        <option value="1933">1933</option>
                                        <option value="1932">1932</option>
                                        <option value="1931">1931</option>
                                        <option value="1930">1930</option>
                                        <option value="1929">1929</option>
                                        <option value="1928">1928</option>
                                        <option value="1927">1927</option>
                                        <option value="1926">1926</option>
                                        <option value="1925">1925</option>
                                        <option value="1924">1924</option>
                                        <option value="1923">1923</option>
                                        <option value="1922">1922</option>
                                        <option value="1921">1921</option>
                                        <option value="1920">1920</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <label>Please select the end date of the insurance cancellation.</label>
                                <div class="d-flex gap-2">
                                    <select v-model="reason.reason_end_month" id="reason_end_month"
                                        aria-labelledby="ariareason" class="form-select">
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

                                    <select v-model="reason.reason_end_year" id="reason_end_year"
                                        aria-labelledby="ariareason" class="form-select">
                                        <option value="">Year</option>
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
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>
                                        <option value="1949">1949</option>
                                        <option value="1948">1948</option>
                                        <option value="1947">1947</option>
                                        <option value="1946">1946</option>
                                        <option value="1945">1945</option>
                                        <option value="1944">1944</option>
                                        <option value="1943">1943</option>
                                        <option value="1942">1942</option>
                                        <option value="1941">1941</option>
                                        <option value="1940">1940</option>
                                        <option value="1939">1939</option>
                                        <option value="1938">1938</option>
                                        <option value="1937">1937</option>
                                        <option value="1936">1936</option>
                                        <option value="1935">1935</option>
                                        <option value="1934">1934</option>
                                        <option value="1933">1933</option>
                                        <option value="1932">1932</option>
                                        <option value="1931">1931</option>
                                        <option value="1930">1930</option>
                                        <option value="1929">1929</option>
                                        <option value="1928">1928</option>
                                        <option value="1927">1927</option>
                                        <option value="1926">1926</option>
                                        <option value="1925">1925</option>
                                        <option value="1924">1924</option>
                                        <option value="1923">1923</option>
                                        <option value="1922">1922</option>
                                        <option value="1921">1921</option>
                                        <option value="1920">1920</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>


                    <hr class="my-4" />

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label"><strong>License Suspensions</strong><br>Has Driver #1 had any
                                suspensions in the past 6 years?</label>
                            <select v-model="vehicle.num_suspensions" class="form-select">
                                <option value="0" selected>No</option>
                                <option value="1">Yes, once</option>
                                <option value="2">Yes, two or more times</option>
                            </select>
                        </div>

                        <div v-if="vehicle.num_suspensions === '1'" class="col-12 mt-3">

                            <label class="form-label">1-Reason for licence suspension </label>

                            <select v-model="vehicle.suspension_reasons" class="form-select">

                                <option value="">Select...</option>
                                <option value="Alcohol">Alcohol related licence suspension</option>
                                <option value="Crim">Criminal related (Non-Alcohol) Licence Suspension</option>
                                <option value="Points">Too many convictions</option>
                                <option value="Fine">Suspension due to non payment of fines</option>
                                <option value="OtherSusp">Other - Administrative</option>
                                <option value="OtherNonAdmin">Other - Non-administrative</option>
                            </select>

                            <div class="col-md-6">
                                <label class="form-label"><strong>Licence reinstatement date </strong></label>
                                <div class="d-flex gap-2">
                                    <select v-model="vehicle.licence_suspension_date" class="form-select">
                                        <option value="" selected>Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4" selected="">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <select v-model="vehicle.licence_suspension_year" class="form-select">
                                        <option value="" selected>Year</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="vehicle.num_suspensions === '2'" class="col-12 mt-3">
                            <span style="color:red;">Please contact a licensed representative at 1-844-726-0907 from 8
                                AM to
                                8 PM (Mon - Fri); 10 AM to 4 PM (Sat) to get an accurate quote. With quotes that have
                                multiple licence suspensions, speaking with a representative will ensure that the
                                incidents
                                are accurately incorporated into your insurance quote.</span>
                        </div>



                        <hr class="my-4" />
                        <div class="col-md-6">
                            <label class="form-label"><strong>Accidents</strong><br>Has Driver #1 had any at-fault
                                accidents?</label>

                            <select v-model="vehicle.num_accidents" class="form-select">
                                <option value="0" selected>No</option>
                                <option value="1">Yes, once</option>
                                <option value="2">Yes, twice</option>
                                <option value="3">Yes, three times</option>
                                <option value="4">Yes, four times</option>
                                <option value="5">Yes, five times</option>
                                <option value="6">Yes, six times</option>
                            </select>
                        </div>


                        <div v-if="vehicle.num_accidents > 0" class="col-12 mt-3">
                            <div v-for="n in parseInt(vehicle.num_accidents)" :key="'accident' + n" class="mb-2">
                                <label class="form-label">{{ n }}-Accident date</label>
                                <div class="d-flex gap-2">
                                    <select v-model="vehicle.accidents[n - 1].month" class="form-select">
                                        <option value="" selected>Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4" selected="">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>


                                    <select v-model="vehicle.accidents[n - 1].year" class="form-select">
                                        <option value="" selected>Year</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="col-md-6">
                            <label class="form-label"><strong>Tickets</strong><br>Has Driver #1 had any tickets (not
                                including parking) in the past 3 years?</label>
                            <select v-model="vehicle.num_tickets" id="num_tickets" aria-labelledby="ariaNumTickets"
                                class="form-select">
                                <option value="0" selected="selected">No</option>
                                <option value="1">Yes, once</option>
                                <option value="2">Yes, twice</option>
                                <option value="3">Yes, three times</option>
                                <option value="4">Yes, four times</option>
                                <option value="5">Yes, five times</option>
                                <option value="6">Yes, six times</option>
                            </select>
                        </div>

                        <div v-if="vehicle.num_tickets > 0" class="col-12 mt-3">
                            <div v-for="n in parseInt(vehicle.num_tickets)" :key="'ticket' + n" class="mb-2">
                                <label class="form-label">{{ n }}-Reason for ticket</label>
                                <div class="col-md-6">
                                    <select v-model="vehicle.tickets[n - 1].reason" class="form-select">
                                        <option value="" disabled="" selected="" hidden="">Select</option>
                                        <optgroup label="Commonly selected">
                                            <option value="IT">Improper turn</option>
                                            <option value="CPV">Prohibited use of hand-held device</option>
                                            <option value="SPOVR">Speeding (45-50 km/h over limit)</option>
                                            <option value="SPMAJOR">Speeding (51+ km/h over limit)</option>
                                            <option value="SP">Speeding (under 45 km/h over limit)</option>
                                            <option value="SS">Stop sign</option>
                                            <option value="TSL">Traffic light</option>
                                        </optgroup>
                                        <optgroup label="Minor">
                                            <option value="DB">Defective brakes</option>
                                            <option value="LIC">Drivers licence violations</option>
                                            <option value="FTS">Failing to signal</option>
                                            <option value="FTY">Failing to yield</option>
                                            <option value="PX">Failing to yield to pedestrian</option>
                                            <option value="FCIC">Failure to carry or have insurance card</option>
                                            <option value="FPEI">Failure to produce evidence of insurance</option>
                                            <option value="SB">Failure to use seatbelts</option>
                                            <option value="FTC">Following too closely</option>
                                            <option value="HL">Headlight offenses</option>
                                            <option value="ILC">Improper lane change</option>
                                            <option value="IOD">Improper opening of door</option>
                                            <option value="IP">Improper passing</option>
                                            <option value="IT">Improper turn</option>
                                            <option value="DH">Improper use of divided highway</option>
                                            <option value="OT">Obstructing traffic</option>
                                            <option value="MINOR">Other minor conviction (not specified)</option>
                                            <option value="SP">Speeding (under 45 km/h over limit)</option>
                                            <option value="SS">Stop sign</option>
                                            <option value="TSL">Traffic light</option>
                                            <option value="UM">Unsafe move</option>
                                            <option value="UV">Unsafe vehicle</option>
                                            <option value="OW">Wrong way on one way</option>
                                        </optgroup>
                                        <optgroup label="Major">
                                            <option value="DRD">Distracted driving</option>
                                            <option value="FRA">Failure to report accident</option>
                                            <option value="FDH">Failure to report damage to highway property</option>
                                            <option value="PSB">Improper passing of a school bus</option>
                                            <option value="PSG">Improper passing/speeding in a school or playground zone
                                            </option>
                                            <option value="OMVNI">Operator motor vehicle - no insurance</option>
                                            <option value="MAJOR">Other major conviction (not specified)</option>
                                            <option value="CPV">Prohibited use of hand-held device</option>
                                            <option value="SPOVR">Speeding (45-50 km/h over limit)</option>
                                            <option value="SPMAJOR">Speeding (51+ km/h over limit)</option>
                                            <option value="STN">Stunting</option>
                                        </optgroup>
                                        <optgroup label="Serious">
                                            <option value="ALC">Blood alcohol level over limit</option>
                                            <option value="CD">Careless driving, undue care or attention</option>
                                            <option value="CN">Criminal negligence</option>
                                            <option value="DD">Dangerous driving</option>
                                            <option value="DUS">Driving while licence under suspension</option>
                                            <option value="FTR">Failure to stop/remain at the scene of an accident
                                            </option>
                                            <option value="IMP">Impaired driving</option>
                                            <option value="MM">Manslaughter committed in the operation or use of a motor
                                                vehicle</option>
                                            <option value="SECTD">Other serious conviction (not specified)</option>
                                            <option value="RAC">Racing</option>
                                            <option value="RB">Refuse breathalyzer</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <label>Ticket date</label>
                                <div class="d-flex gap-2">
                                    <select v-model="vehicle.tickets[n - 1].month" class="form-select">
                                        <option value="" selected>Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4" selected="">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>

                                    <select v-model="vehicle.tickets[n - 1].year" class="form-select">
                                        <option value="" selected>Year</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="col-md-6">
                            <label class="form-label"><strong>Please tell us when you would like your policy to start.
                                </strong></label>
                            <div class="d-flex gap-2">
                                <select v-model="vehicle.policy_start_month" id="policy-start-month"
                                    aria-labelledby="ariaPolicyStart" class="form-select"
                                    aria-label="Please tell us when you would like your policy to start.">
                                    <option value="" selected>Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4" selected="">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select v-model="vehicle.policy_start_year" id="policy-start-year"
                                    aria-labelledby="ariaPolicyStart" class="form-select"
                                    aria-label="Please tell us when you would like your policy to start.">
                                    <option value="" selected>Year</option>
                                     <option value="2022">2022</option>
                                      <option value="2023">2023</option>
                                       <option value="2024">2024</option>
                                    <option value="2025" selected="">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                                
                            </div>
                                    <span v-if="validationErrors[vehicle.id]?.policy_start_date" class="error">
                            {{ validationErrors[vehicle.id].policy_start_date }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mt-5">
                        <button type="button" class="btn btn-outline-dark px-4 py-2 rounded-pill"
                            @click="$router.push('/autoquote/to/vehicle')">Back</button>
                        <button type="submit" class="btn btn-success px-4 py-2 rounded-pill" @click="DriverAction"
                            :disabled="isSubmitting">Continue</button>
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
            maxVehicles: 5,
            activeTab: "New_vehicle1",
            activeReasonTab: {
                New_vehicle1: 0,
            },
            isSubmitting: false,
            validationErrors: {},
            vehicles: [
                {
                    id: "New_vehicle1",
                    parkLocation: "garage",
                    antiTheftDevice: "No",
                    first_name: "",
                    last_name: "",
                    marital_status: "",
                    occupational_status: "",
                    dob_month: "",
                    dob_day: "",
                    dob_year: "",
                    gender: "",
                    license_class: "",
                    age_numb: "",
                    full_license_month: "",
                    full_license_year: "",
                    has_foreign_license: "",
                    first_insured_year: "",
                    time_with_insurer: "",
                    num_suspensions: "0",
                    num_accidents: "0",
                    num_tickets: "0",
                    licence_suspension_date: "",
                    licence_suspension_year: "",
                    accidents: [],
                    tickets: [],
                    policy_start_month: "",
                    policy_start_year: "",
                    insuranceCancelled: false,
                    reasons: [
                        {
                            cancellationReason: "",
                            reason_month: "",
                            reason_year: "",
                            reason_end_month: "",
                            reason_end_year: "",
                        },
                    ],
                },
            ],
        };
    },

    watch: {
        vehicles: {
            handler(newVehicles) {
                newVehicles.forEach((vehicle) => {
                    const ensureLength = (target, length, defaultValue) => {
                        while (target.length < length) target.push({ ...defaultValue });
                        if (target.length > length) target.length = length;
                    };

                    const accCount = parseInt(vehicle.num_accidents || "0");
                    if (!Array.isArray(vehicle.accidents)) vehicle.accidents = [];
                    ensureLength(vehicle.accidents, accCount, {
                        month: "",
                        year: "",
                    });

                    const ticketCount = parseInt(vehicle.num_tickets || "0");
                    if (!Array.isArray(vehicle.tickets)) vehicle.tickets = [];
                    ensureLength(vehicle.tickets, ticketCount, {
                        reason: "",
                        month: "",
                        year: "",
                    });
                });
            },
            deep: true,
        },
    },

    mounted() {
        const rawDriverIds = localStorage.getItem("driverIdsData");
        let driverIds = [];

        if (rawDriverIds) {
            try {
                const parsed = JSON.parse(rawDriverIds);
                const storedTime = parsed.timestamp;
                const now = Date.now();

                if (now - storedTime > 3 * 60 * 60 * 1000) {
                    
                    localStorage.removeItem("driverIdsData");
                    this.vehicles = [this.createBlankVehicle()];
                    this.activeTab = "New_vehicle1";
                     this.$router.push({ path: "/" });
                    return;
                }

                driverIds = parsed.driverIds || [];
            } catch (e) {
                console.error("Invalid driverIds JSON:", rawDriverIds);
                localStorage.removeItem("driverIdsData");
                driverIds = [];
                return;
            }
        }

       

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/vehicle/get_drivers`, { driverIds })
            .then((response) => {
                const loadedDrivers = response.data.drivers;

                this.vehicles = loadedDrivers.map((d, i) => ({
                    id: d.id || `New_vehicle${i + 1}`,
                    parkLocation: d.parkLocation || "garage",
                    antiTheftDevice: d.antiTheftDevice || "No",
                    first_name: d.first_name || "",
                    last_name: d.last_name || "",
                    marital_status: d.marital_status || "",
                    occupational_status: d.occupational_status || "",
                    dob_month: d.dob_month || "",
                    dob_day: d.dob_day || "",
                    dob_year: d.dob_year || "",
                    gender: d.gender || "",
                    license_class: d.license_class || "",
                    age_numb: d.age_numb || "",
                    full_license_month: d.full_license_month || "",
                    full_license_year: d.full_license_year || "",
                    has_foreign_license: d.has_foreign_license || "",
                    first_insured_year: d.first_insured_year || "",
                    time_with_insurer: d.time_with_insurer || "",
                    num_suspensions: d.num_suspensions || "0",
                    num_accidents: d.num_accidents || "0",
                    accidents: d.accidents || [],
                    num_tickets: d.num_tickets || "0",
                    tickets: d.tickets || [],
                    policy_start_month: d.policy_start_month || "",
                    policy_start_year: d.policy_start_year || "",
                    insuranceCancelled: d.insuranceCancelled || false,
                    reasons:
                        d.reasons && d.reasons.length > 0
                            ? d.reasons
                            : [
                                {
                                    cancellationReason: "",
                                    reason_month: "",
                                    reason_year: "",
                                    reason_end_month: "",
                                    reason_end_year: "",
                                },
                            ],
                }));

                this.activeTab = this.vehicles[0]?.id || "New_vehicle1";

                // ✅ Vue 3: directly assign, no this.$set
                this.vehicles.forEach((v) => {
                    this.activeReasonTab[v.id] = 0;
                });
            })
            .catch((err) => {
                console.error("Failed to load driver data:", err);
            });
    },

    methods: {
        addNewReason(vehicleIndex) {
            const newReason = {
                cancellationReason: "",
                reason_month: "",
                reason_year: "",
                reason_end_month: "",
                reason_end_year: "",
            };

            const vehicle = this.vehicles[vehicleIndex];
            vehicle.reasons.push(newReason);

            
            this.activeReasonTab[vehicle.id] = vehicle.reasons.length - 1;
        },
         removeVehicle(index) {
    if (this.vehicles.length > 1) {
      this.vehicles.splice(index, 1);

     if (!this.vehicles.find(v => v.id === this.activeTab)) {
        this.activeTab = this.vehicles[0].id;
      }
    } else {
      alert("At least one driver is required.");
    }
  },


       validateDrivers() {
    let valid = true;
    this.validationErrors = {}; // reset errors

    this.vehicles.forEach((driver, index) => {
        const driverErrors = {};

        if (!driver.first_name) driverErrors.first_name = "Please enter First name.";
        if (!driver.last_name) driverErrors.last_name = "please enter Last name.";
         if (!driver.dob_month || !driver.dob_day || !driver.dob_year) {
            driverErrors.dob = "Please select date of birth.";
        }
       
        if (!driver.age_numb) driverErrors.age_numb = "Please enter age.";
        if (!driver.gender) driverErrors.gender = "Please select Gender";
        if (!driver.license_class) driverErrors.license_class = "Please select Type of license";
        if (!driver.full_license_month || !driver.full_license_year) {
            driverErrors.full_license_date = "Please select license date";
        }
        if (!driver.marital_status) driverErrors.marital_status = "Please select Marital status.";
        if (!driver.occupational_status) driverErrors.occupational_status = "Please select  Occupational status.";
        if (!driver.has_foreign_license) driverErrors.has_foreign_license = "Please select  Driver previously hold a full license.";
        if (!driver.first_insured_year) driverErrors.first_insured_year = "Please select  first listed as a driver on a insurance policy.";
        if (!driver.time_with_insurer) driverErrors.time_with_insurer = "Please select how long current insurance company.";
        
         if (!driver.policy_start_month || !driver.policy_start_year) {
            driverErrors.policy_start_date = "Please select Policy start date.";
        }

        // Save errors for this driver if any
        if (Object.keys(driverErrors).length > 0) {
            this.validationErrors[driver.id] = driverErrors;
            valid = false;
        }
    });

    return valid;
},


        addVehicle() {
            if (this.vehicles.length >= this.maxVehicles) {
                alert(`Maximum ${this.maxVehicles} Driver allowed!`);
                return;
            }

            const newVehicleId = `New_vehicle${this.vehicles.length + 1}`;

            const newVehicle = {
                id: newVehicleId,
                parkLocation: "garage",
                antiTheftDevice: "No",
                first_name: "",
                last_name: "",
                marital_status: "",
                occupational_status: "",
                dob_month: "",
                dob_day: "",
                dob_year: "",
                gender: "",
                license_class: "",
                age_numb: "",
                full_license_month: "",
                full_license_year: "",
                has_foreign_license: "",
                first_insured_year: "",
                time_with_insurer: "",
                num_suspensions: "0",
                num_accidents: "0",
                accidents: [],
                num_tickets: "0",
                tickets: [],
                policy_start_month: "",
                policy_start_year: "",
                insuranceCancelled: false,
                reasons: [
                    {
                        cancellationReason: "",
                        reason_month: "",
                        reason_year: "",
                        reason_end_month: "",
                        reason_end_year: "",
                    },
                ],
            };

            this.vehicles.push(newVehicle);
            this.activeTab = newVehicleId;

            // ✅ Vue 3 direct assignment
            this.activeReasonTab[newVehicleId] = 0;
        },

        async DriverAction() {
  //          this.isSubmitting = true;
//            this.validationErrors = {};
    if (!this.validateDrivers()) {
        this.isSubmitting = false;
        return;
    }

    this.isSubmitting = true;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/vehicle/driversave`,
                    this.vehicles
                );

                if (response.data.driverIds && Array.isArray(response.data.driverIds)) {
                    const saveData = {
                        driverIds: response.data.driverIds,
                        timestamp: Date.now(),
                    };
                    localStorage.setItem("driverIdsData", JSON.stringify(saveData));
                } else {
                    console.warn("No driver IDs returned from server");
                }

                alert("Driver saved successfully!");
                this.$router.push("/autoquote/to/discounts");
            } catch (error) {
                this.isSubmitting = false;
               // this.validationErrors = error.response?.data?.errors || error.response?.data?.error || {};
            }
        },
    },
};
</script>