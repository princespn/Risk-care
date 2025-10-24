<template>
    <div class="content-wrapper" style="min-height: 286px;">
        <div class="container-fluid px-4">
            <!---<div class="d-flex justify-content-end align-items-center">
                <form @submit.prevent="searchVehicles" class="col-xl-4 col-md-auto col-lg-auto mb-0 me-xl-3" role="search">
                    <div class="input-group">
                        <input type="text" v-model="searchQuery" class="form-control" placeholder="Search here" />
                        <button type="submit" class="btn">
                            <i class="nav-icon fa fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>-->
      
      <div class="pageTitle pt-3 pb-3 md-pt-0 d-flex justify-content-between align-items-center">
        <h3 class="md-mb-0">Vehicle Make details</h3>
        <button class="btn btn-success" @click="showAddModal">Add Vehicle</button>
      </div>

            <!--<div class="pageTitle pt-3 pb-3 md-pt-0">
                <h3 class="md-mb-0">Vehicle Name</h3><router-link to="#" @click="showAddModal" class="nav-link">
                    Add Vehicle<i style="float: right;color:red;font-size:22px;" class="nav-icon fa fa-plus-circle"></i>
                </router-link>
            </div>-->

          

            <div class="card-body p-2">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Vehicle Make</th>              
                            <th>Status</th>                      
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, index) in filteredVehicles" :key="vehicle.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ vehicle.name }}</td>
                            <td>Active</td>
                     
                            <td style="display:flex;">
                                <router-link to="#" @click="showEditModal(vehicle)" class="nav-link">
                                    <i style="color:red;font-size:18px;" class="nav-icon fas fa-edit"></i>
                                </router-link>&nbsp; &nbsp; 
                                <router-link to="#" @click="showDeleteModal(vehicle)" class="nav-link">
                                    <i style="color:red;font-size:18px;" class="nav-icon fa fa-trash"></i>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Edit Vehicle Modal -->
        <b-modal v-model="isEditModalVisible" title="Edit Vehicle Details" hide-footer>
            <form @submit.prevent="updateVehicle">
                <div class="form-group">
                    <label for="title"><strong>Vehicle Name</strong></label>
                    <input
                        type="text"
                        v-model="editVehicleForm.name"
                        class="form-control"
                        id="title"    required />
                </div>
                          
                
                <div class="form-group">
                    <b-button type="submit" class="form-control" variant="primary">Update Vehicle</b-button>
                </div>
            </form>
        </b-modal>

        <!-- Add Vehicle Modal -->
        <b-modal  v-model="isAddModalVisible" title="Add Vehicle Details" hide-footer>
            <form @submit.prevent="addVehicle">
                <div class="form-group">
                    <label for="title">Vehicle Name</label>
                    <input type="text" v-model="addVehicleForm.name"  class="form-control"   id="title"  required/>
                </div>

                <!--<div class="form-group">
                    <label for="cat_id">Category</label>
                    <select v-model="editVehicleForm.cat_id" class="form-control" id="cat_id" required>
                        <option value="" disabled>Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.title }}
                        </option>
                    </select>
                </div>-->

                <div class="form-group">
                    <b-button type="submit" class="form-control" variant="primary">Add Vehicle</b-button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";

import { BButton, BModal } from "bootstrap-vue-next";

export default {
    components: {
        BButton,
        BModal
    },
    data() {
        return {
            VehicleDetails: [],         
            searchQuery: "",
            isEditModalVisible: false,
            isAddModalVisible: false,
            editVehicleForm: {
                id: null,
                name: "",
         
            },
            addVehicleForm: {
                name: "",
          
            },
            loading: false,
            error: null,
        };
    },
    computed: {
        filteredVehicles() {
            if (this.searchQuery.trim() === "") return this.VehicleDetails;
            const search = this.searchQuery.toLowerCase();
            return this.VehicleDetails.filter(
                (Vehicle) =>
                Vehicle.name.toLowerCase().includes(search)
     
            );
        },
    },
    mounted() {
        this.fetchVehicleDetails();

    },
    methods: {
        async fetchVehicleDetails() {
            this.loading = true;
            this.error = null;
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$router.push("/login");
                    return;
                }
                const response = await axios.get("http://66.179.81.116:8080/api/vehicles/getvehiclemake", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               // this.VehicleDetails = response.data.Vehicles || [];
               this.VehicleDetails = response.data || [];
            } catch (error) {
                this.error = "Error fetching Vehicle details.";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        showEditModal(Vehicle) {
            this.editVehicleForm = { ...Vehicle };
            this.isEditModalVisible = true;
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async updateVehicle() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$router.push("/login");
                    return;
                }
                const response = await axios.put(
                    `http://66.179.81.116:8080/api/vehicles/update-vehicle/${this.editVehicleForm.id}`,
                    this.editVehicleForm,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.status) {
                    const index = this.VehicleDetails.findIndex(
                        (p) => p.id === this.editVehicleForm.id
                    );
                    if (index !== -1) {
                        this.VehicleDetails[index] = { ...this.editVehicleForm };
                    }
                    this.isEditModalVisible = false;
                } else {
                    console.error("Update failed:", response.data.message);
                }
            } catch (error) {
                console.error("Error updating Vehicle:", error);
            }
        },
        async addVehicle() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$router.push("/login");
                    return;
                }
                const response = await axios.post("http://66.179.81.116:8080/api/vehicles/add-vehicle", this.addVehicleForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    this.VehicleDetails.push(response.data.Vehicle);
                    this.isAddModalVisible = false;
                    this.$router.push("/vehicle_make");

                } else {
                    console.error("Add failed:", response.data.message);
                }
            } catch (error) {
                console.error("Error adding Vehicle:", error);
            }
        }  
    
    },
};
</script>