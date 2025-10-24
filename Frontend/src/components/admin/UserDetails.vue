<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LeftMenue from './LeftMenue.vue';
import { Modal } from 'bootstrap';


const users = ref([]);
const selectedUser = ref(null);
const isEditMode = ref(false);
const errorMessage = ref('');

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getusers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
  }
};

const openUserModal = (user, editMode = false) => {
  selectedUser.value = { ...user, password: '', confirm_password: '' }; 
  isEditMode.value = editMode;
  errorMessage.value = '';
  const modal = new Modal(document.getElementById('userModal'));
  modal.show();
};

const saveUser = async () => {
  try {
    errorMessage.value = '';


    if (selectedUser.value.password || selectedUser.value.confirm_password) {
      if (selectedUser.value.password !== selectedUser.value.confirm_password) {
        errorMessage.value = 'Passwords do not match.';
        return;
      }
      if (selectedUser.value.password.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters long.';
        return;
      }
    }

    const token = localStorage.getItem("token");

    const payload = {
      email: selectedUser.value.email,
      name: selectedUser.value.name,
      age: selectedUser.value.age,
      username: selectedUser.value.username,
      phone: selectedUser.value.phone,
      profile_image: selectedUser.value.profile_image,
      status: selectedUser.value.status,
      role_id: selectedUser.value.role_id,
      ...(selectedUser.value.password ? { password: selectedUser.value.password } : {})
    };

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/users/update_user`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const modalElement = document.getElementById('userModal');
    let modalInstance = Modal.getInstance(modalElement);
    modalInstance?.hide();

    fetchUsers();
    
  } catch (error) {
    console.error("Error saving user:", error.response?.data || error.message);
    errorMessage.value = error.response?.data?.message || 'An error occurred while saving.';
  }
};

onMounted(() => {
  fetchUsers();

});
</script>
<template>
  <div class="row min-vh-100">
    <LeftMenue />

    <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-content">
      <div class="card shadow-sm border-0">
        <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center">
          <span>User details</span>
        </div>

        <div class="card-body p-0">
          <table class="table mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span :class="['badge', user.status === '1' ? 'bg-success' : 'bg-secondary']">
                    {{ user.status === '1' ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>   {{ user.role_id === 1 ? 'Admin' : 'User' }}</td>
                <td>{{ user.phone }}</td>
                <td>
                  <button class="btn btn-sm btn-primary me-1" @click="openUserModal(user, false)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-warning me-1" @click="openUserModal(user, true)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>

              <tr v-if="users.length === 0">
                <td colspan="6" class="text-center">No users found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->

      
      <div class="modal fade" id="userModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title bg-primary px-3 py-2 text-white rounded">{{ isEditMode ? 'Edit User' : 'View User' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">              
              <div v-if="selectedUser">

                   <div class="text-center mb-4">
            <img id="userProfileImg"
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Profile" class="rounded-circle border border-3"
              style="width: 150px; height: 150px; object-fit: cover;">
           
          </div>

          <div class="container">
                <div class="row mb-3">
              <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input type="text" v-model="selectedUser.name" class="form-control" :disabled="!isEditMode" />
                </div>
               <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" v-model="selectedUser.email" class="form-control" disabled />
                </div>
                </div>
                     <div class="row mb-3">
              <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input type="text" v-model="selectedUser.phone" class="form-control" :disabled="!isEditMode" />
                </div>
        <div class="col-md-6">                 

  <label class="form-label">Status</label>
  <select v-model="selectedUser.status" class="form-select" :disabled="!isEditMode">
    <option value="1">Active</option>
    <option value="0">Inactive</option>
  </select>
</div>
                </div>
               <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Password</label>
                  <input type="password" v-model="selectedUser.password" class="form-control" :disabled="!isEditMode" />
                  </div>
                                <div class="col-md-6">
                <label class="form-label">Confirm Password</label>
                  <input type="password" v-model="selectedUser.confirm_password" class="form-control" :disabled="!isEditMode" />
                  </div>
                    <div v-if="errorMessage" class="error">
                      {{ errorMessage }}
                    </div>
                </div>

                 <h4 class="mt-4">Address</h4>
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">City</label>
                <input type="text" id="userCity" class="form-control" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">State</label>
                <input type="text" id="userState" class="form-control" disabled>
              </div>
            </div>
 
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Postal Code</label>
                <input type="text" id="userPostal" class="form-control" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Country</label>
                <input type="text" id="userCountry" class="form-control" disabled>
              </div>
            </div>

              </div>
            </div>
            <div class="modal-footer">
              <button v-if="isEditMode" type="button" class="btn btn-primary" @click="saveUser">Save</button>
              <!----<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>-->
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
