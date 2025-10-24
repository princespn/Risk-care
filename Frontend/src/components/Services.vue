<script setup>

import image from "/src/assets/images/mask-group0.png";

</script>

<template>
  <div class="areas-section">
    <div class="container maxwidth">
      <h2 class="areas-heading">Areas We Serve</h2>
      <p class="text-muted mb-4">Whether you prefer to buy online or want expert guidance,<br>
        Insurify makes it easy to find your perfect policy.</p>

      <!-- Skyline (placeholder) -->
      <img :src="image" alt="City skyline" class="img-fluid w-100">

      <!-- Cities -->
      <div class="city-list">
        <span>Ottawa</span>|
        <span>Ontario</span>|
        <span>Toronto</span>|
        <span>Vancouver</span>|
        <span>Mississauga</span>|
        <span>London</span>|
        <span>Kingston</span>|
        <span>Montreal</span>|
        <span>Brampton</span>
      </div>
    </div>
  </div>
  </template>