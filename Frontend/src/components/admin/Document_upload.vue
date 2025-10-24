<template>
  <div class="page">
    <!-- Trigger button -->
    <button class="open-btn" @click="show = true">Upload Documents</button>

    <!-- Modal -->
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <h2>Upload Documents</h2>

        <!-- File selector -->
        <label class="file-label">
          <input type="file" class="file-input" @change="handleFileChange" />
          <span>Select Document</span>
        </label>

        <!-- File list -->
        <ul v-if="files.length" class="file-list">
          <li v-for="(f, i) in files" :key="i" class="file-item">
            <span class="file-name">{{ f.file.name }}</span>
            <span class="file-status" :class="f.status">{{ f.status }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      show: false,
      files: [],
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      this.files = [];
    },
    async handleFileChange(e) {
      const newFile = e.target.files[0];
      if (!newFile) return;

      // add file to list with pending status
      const fileObj = { file: newFile, status: "pending" };
      this.files.push(fileObj);
      const index = this.files.length - 1;

      e.target.value = ""; // reset input

      // upload immediately
      await this.uploadFile(fileObj, index);
    },
    async uploadFile(fileObj, index) {
      const formData = new FormData();
      formData.append("file", fileObj.file);

      try {
        this.files[index].status = "uploading";
        const token = localStorage.getItem("token");

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/documents/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.files[index].status = "done";
      } catch (err) {
        console.error("Upload error:", err);
        this.files[index].status = "error";
      }
    },
  },
};
</script>

<style scoped>
/* Open button */
.open-btn {
  background: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.open-btn:hover {
  background: #388e3c;
}

/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 50, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal box */
.modal-box {
  background: #f8fff9;
  border: 2px solid #a5d6a7;
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
  text-align: left;
  z-index: 1001;
}

/* Title */
h2 {
  margin-top: 0;
  color: #2e7d32;
}

/* File selector */
.file-label {
  display: inline-block;
  background: #a5d6a7;
  color: #1b5e20;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin: 12px 0;
  font-weight: bold;
}
.file-label:hover {
  background: #81c784;
}
.file-input {
  display: none;
}

/* File list */
.file-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}
.file-item {
  display: flex;
  justify-content: space-between;
  background: #ecfdf5;
  border: 1px solid #cdeccd;
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 6px;
}
.file-name {
  color: #2e7d32;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-status {
  font-weight: bold;
  margin-left: 8px;
}
.file-status.pending {
  color: #666;
}
.file-status.uploading {
  color: #0277bd;
}
.file-status.done {
  color: #1b5e20;
}
.file-status.error {
  color: #c62828;
}
</style>
